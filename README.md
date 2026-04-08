# Report Hub

Report Hub is an Expo + React Native app for collecting images, turning them into a PDF report, and sharing the generated file from a mobile device.

The app includes:
- Default login with local admin credentials
- Bottom tab navigation with `Home` and `Profile`
- Light and dark theme toggle
- Gallery image picker
- Camera capture flow
- Image preview and remove actions
- PDF generation from selected images
- PDF sharing

## Default Login

Use these default credentials:

- Username: `admin`
- Password: `Password@123`

## Main Functions Added

### 1. Login Authentication

What it does:
- Shows a login screen before entering the app
- Validates a default username and password
- Blocks access to protected screens when the user is not logged in
- Allows logout from the Profile screen

Main files:
- [app/index.tsx](/t:/public%20repos/Report-Hub/report-hub/app/index.tsx)
- [lib/auth-context.tsx](/t:/public%20repos/Report-Hub/report-hub/lib/auth-context.tsx)

Packages used:
- `expo-router`: screen routing and redirects
- `react`: auth state management with context and hooks
- `react-native`: form inputs and alerts

### 2. Home Tab

What it does:
- Lets the user pick images from the gallery
- Lets the user open the camera screen
- Shows selected images in a grid
- Generates a PDF from selected images
- Shares the generated PDF
- Clears all selected images

Main files:
- [app/(tabs)/home.tsx](/t:/public%20repos/Report-Hub/report-hub/app/(tabs)/home.tsx)
- [components/image-preview-grid.tsx](/t:/public%20repos/Report-Hub/report-hub/components/image-preview-grid.tsx)
- [lib/image-selection-context.tsx](/t:/public%20repos/Report-Hub/report-hub/lib/image-selection-context.tsx)
- [utils/pdf.ts](/t:/public%20repos/Report-Hub/report-hub/utils/pdf.ts)

Packages used:
- `expo-image-picker`: selecting images from gallery
- `expo-router`: navigation to camera screen
- `expo-sharing`: sharing the generated PDF
- `expo-file-system`: reading image files and saving PDFs
- `expo-print`: creating the PDF file from HTML
- `react`: state and shared image context
- `react-native`: alerts and UI primitives

### 3. Camera Capture Screen

What it does:
- Requests camera permission
- Captures photos directly from the device camera
- Adds captured photos into the report image list
- Supports front/back camera switch

Main file:
- [app/camera.tsx](/t:/public%20repos/Report-Hub/report-hub/app/camera.tsx)

Packages used:
- `expo-camera`: camera permission and camera capture
- `expo-router`: back navigation
- `react`: capture state and refs
- `react-native`: camera controls and overlays

### 4. Profile Tab

What it does:
- Shows the signed-in admin profile
- Provides theme switching between light and dark mode
- Provides logout action

Main file:
- [app/(tabs)/profile.tsx](/t:/public%20repos/Report-Hub/report-hub/app/(tabs)/profile.tsx)

Packages used:
- `expo-router`: logout redirect
- `lucide-react-native`: profile, theme, shield, and logout icons
- `react`: theme and auth hooks
- `react-native`: layout and text UI

### 5. Theme System

What it does:
- Supports light mode and dark mode
- Stores the current theme in React context during runtime
- Updates colors across cards, buttons, tabs, scroll backgrounds, and screens

Main files:
- [lib/theme-context.tsx](/t:/public%20repos/Report-Hub/report-hub/lib/theme-context.tsx)
- [components/screen-shell.tsx](/t:/public%20repos/Report-Hub/report-hub/components/screen-shell.tsx)
- [components/neumorph-card.tsx](/t:/public%20repos/Report-Hub/report-hub/components/neumorph-card.tsx)
- [components/action-button.tsx](/t:/public%20repos/Report-Hub/report-hub/components/action-button.tsx)

Packages used:
- `react`: theme context and toggle logic
- `expo-status-bar`: correct status bar style for light/dark mode
- `react-native`: theming styles and layout containers

### 6. Bottom Tab Navigation

What it does:
- Creates `Home` and `Profile` tabs
- Shows animated active tab styling
- Protects the tab area behind authentication

Main files:
- [app/(tabs)/_layout.tsx](/t:/public%20repos/Report-Hub/report-hub/app/(tabs)/_layout.tsx)
- [components/animated-tab-icon.tsx](/t:/public%20repos/Report-Hub/report-hub/components/animated-tab-icon.tsx)

Packages used:
- `expo-router`: tab navigation
- `react-native-reanimated`: active tab animation
- `lucide-react-native`: tab icons

### 7. Shared UI Components

What they do:
- `ScreenShell`: shared page background and scroll layout
- `NeumorphCard`: reusable surface card
- `ActionButton`: reusable primary and outline buttons
- `ImagePreviewGrid`: reusable image list preview

Main files:
- [components/screen-shell.tsx](/t:/public%20repos/Report-Hub/report-hub/components/screen-shell.tsx)
- [components/neumorph-card.tsx](/t:/public%20repos/Report-Hub/report-hub/components/neumorph-card.tsx)
- [components/action-button.tsx](/t:/public%20repos/Report-Hub/report-hub/components/action-button.tsx)
- [components/image-preview-grid.tsx](/t:/public%20repos/Report-Hub/report-hub/components/image-preview-grid.tsx)

Packages used:
- `react-native`: UI layout and touch handling
- `react-native-reanimated`: tab animation support

## Package Usage By Feature

| Package | Where it is used | Why it is used |
| --- | --- | --- |
| `expo` | whole app | Expo app runtime |
| `expo-router` | routing, tabs, redirects | file-based navigation |
| `expo-camera` | camera screen | capture images from device camera |
| `expo-image-picker` | home screen | choose images from gallery |
| `expo-file-system` | PDF utility | read image files and save generated PDF |
| `expo-print` | PDF utility | build PDF from HTML |
| `expo-sharing` | home screen | share generated PDF |
| `expo-status-bar` | root layout | light/dark status bar appearance |
| `react-native-safe-area-context` | app provider | safe area support |
| `react-native-reanimated` | tab animation and screen entrance | smooth UI animations |
| `react-native-svg` | icon rendering | required by Lucide icons |
| `lucide-react-native` | tabs and profile UI | app icons |
| `@gluestack-ui/themed` | typography/provider | UI provider and heading components |
| `@gluestack-ui/config` | gluestack config | gluestack theme config |
| `@gluestack-style/react` | gluestack styling internals | Gluestack dependency |
| `nativewind` | className styling | Tailwind-style React Native styling |
| `tailwindcss` | NativeWind setup | utility class generation |
| `patch-package` | postinstall step | keep local fixes for dependency issues |

## Project Structure

```text
app/
  _layout.tsx            Root providers and stack navigation
  index.tsx              Login screen
  camera.tsx             Camera capture screen
  (tabs)/
    _layout.tsx          Bottom tab layout
    home.tsx             Home/report builder screen
    profile.tsx          Profile and theme screen

components/
  action-button.tsx
  animated-tab-icon.tsx
  image-preview-grid.tsx
  neumorph-card.tsx
  screen-shell.tsx

lib/
  auth-context.tsx
  gluestack-provider.tsx
  image-selection-context.tsx
  theme-context.tsx

utils/
  pdf.ts
```

## Run The App

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Run type check:

```bash
npm run typecheck
```

## Notes

- The project uses `patch-package` to keep fixes for some dependency issues after install.
- Theme mode is currently stored in memory, so it resets after app restart.
- Login is local and static right now, not connected to a backend.
