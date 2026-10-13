# Aujunpeak

A standalone Expo app with an animated startup check, an iOS-version reference screen, and four tabs. The Sandbox, Library, and Settings tabs are intentionally empty placeholders.

## Run locally

Requires Node.js 22 and pnpm 10.

```sh
pnpm install
pnpm start
```

Press `w` in Expo's terminal to open the web preview, or scan the QR code with Expo Go on an iPhone to read that device's actual iOS version. The web preview cannot read an iPhone's OS version and therefore displays “Chờ thiết bị iOS”.

## GitHub iOS build

The included workflow builds and uploads an **unsigned iOS Simulator `.app`** on a GitHub-hosted macOS runner. It does not produce a signed `.ipa` for installing on a physical iPhone.
It also uploads the Xcode log and result bundle so native build failures can be diagnosed from the workflow artifacts.

## Compatibility screen

The app only reads the operating-system version and compares it with the static reference ranges shown on screen. iOS 27 beta entries require one of the listed build IDs; the app does not claim to verify that build. The app does not access the iOS sandbox or run system tools.
