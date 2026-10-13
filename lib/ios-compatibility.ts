import { Platform } from 'react-native';

export type CompatibilityStatus =
  | 'supported'
  | 'build-required'
  | 'unsupported'
  | 'preview'
  | 'not-ios';

export type CompatibilityResult = {
  status: CompatibilityStatus;
  version: string | null;
  title: string;
  description: string;
};

export const IOS_SUPPORT_MATRIX = [
  {
    major: 17,
    title: 'iOS 17',
    versions: '17.0 – 17.7.x',
    detail: 'Bản phát hành ổn định',
    status: 'supported' as const,
  },
  {
    major: 18,
    title: 'iOS 18',
    versions: '18.0 – 18.7.1',
    detail: 'Bản phát hành ổn định',
    status: 'supported' as const,
  },
  {
    major: 26,
    title: 'iOS 26',
    versions: '26.0 – 26.6.1',
    detail: 'Bản phát hành ổn định',
    status: 'supported' as const,
  },
  {
    major: 27,
    title: 'iOS 27 Beta',
    versions: 'Dev Beta 1–4 · Public Beta 1–2',
    detail: 'Build: 24A5355q · 24A5370h · 24A5380h · 24A5390f',
    status: 'build-required' as const,
  },
];

export function getDeviceIOSVersion(): string | null {
  if (Platform.OS !== 'ios') {
    return null;
  }

  const version = String(Platform.Version).trim();
  return /^\d+(?:\.\d+){0,2}/.test(version) ? version : null;
}

export function checkIOSCompatibility(
  version: string | null = getDeviceIOSVersion(),
): CompatibilityResult {
  if (!version) {
    if (Platform.OS === 'web') {
      return {
        status: 'preview',
        version: null,
        title: 'Chờ thiết bị iOS',
        description:
          'Bản xem trước web không thể đọc phiên bản hệ điều hành của iPhone.',
      };
    }

    return {
      status: 'not-ios',
      version: null,
      title: 'Không phải iPhone hoặc iPad',
      description:
        'Hãy mở ứng dụng trên iPhone hoặc iPad để kiểm tra phiên bản iOS.',
    };
  }

  const [major, minor = 0, patch = 0] = version
    .split('.')
    .map((part) => Number.parseInt(part, 10));

  if (major === 27 && minor === 0) {
    return {
      status: 'build-required',
      version,
      title: 'Cần xác minh mã build',
      description:
        'iOS 27 beta chỉ có trong phạm vi tham chiếu với các mã build được liệt kê bên dưới.',
    };
  }

  const isSupported =
    (major === 17 && minor <= 7) ||
    (major === 18 && (minor < 7 || (minor === 7 && patch <= 1))) ||
    (major === 26 && (minor < 6 || (minor === 6 && patch <= 1)));

  if (isSupported) {
    return {
      status: 'supported',
      version,
      title: 'Nằm trong dải tham chiếu',
      description:
        'Phiên bản iOS này thuộc một trong các dải phiên bản đã được đối chiếu.',
    };
  }

  return {
    status: 'unsupported',
    version,
    title: 'Ngoài dải tham chiếu',
    description:
      'Phiên bản này chưa có trong danh sách phiên bản được đối chiếu bên dưới.',
  };
}
