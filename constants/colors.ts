/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    text: '#102044',
    tint: '#155DF5',
    background: '#F7FAFF',
    foreground: '#102044',
    card: '#FFFFFF',
    cardForeground: '#102044',
    primary: '#155DF5',
    primaryForeground: '#ffffff',
    secondary: '#EAF1FF',
    secondaryForeground: '#174AB5',
    muted: '#F0F5FD',
    mutedForeground: '#75839C',
    accent: '#E7F8FF',
    accentForeground: '#087DB8',
    destructive: '#D94B62',
    destructiveForeground: '#ffffff',
    border: '#E3EBF8',
    input: '#DCE6F6',
    heroStart: '#1245D7',
    heroMiddle: '#1768F5',
    heroEnd: '#16A5F7',
    success: '#15846B',
    successBackground: '#E5F8F1',
    warning: '#9A6A13',
    warningBackground: '#FFF5DC',
    dangerBackground: '#FFF0F2',
    white: '#FFFFFF',
    softBlue: '#EAF2FF',
    cyan: '#72E5FF',
    heroText: 'rgba(255,255,255,0.94)',
    heroMuted: 'rgba(255,255,255,0.76)',
    heroLine: 'rgba(255,255,255,0.26)',
    heroSurface: 'rgba(255,255,255,0.16)',
    heroSurfaceBorder: 'rgba(255,255,255,0.32)',
    heroDot: '#9DFFD8',
    heroDecoration: 'rgba(255,255,255,0.055)',
    cardShadow: '#103A81',
  },

  radius: 24,
};

export default colors;
