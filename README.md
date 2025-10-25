# Wrestling Club App

A modern wrestling club management application built with Next.js 16, Expo SDK 54, and Clerk authentication.

## 🚀 Features

- **Cross-platform**: Web (Next.js) and Mobile (Expo/React Native)
- **Authentication**: Secure user authentication with Clerk
- **Modern Stack**: Latest versions of Turbo, Next.js, and Expo
- **Package Management**: Uses pnpm for fast and efficient dependency management

## 📱 Apps

### Web App (`apps/web`)

- Next.js 16 with App Router
- Clerk authentication
- Responsive design with Tailwind CSS
- Home page, sign-in/sign-up, and authenticated dashboard

### Native App (`apps/native`)

- Expo SDK 54 with Expo Router
- Clerk authentication for React Native
- Cross-platform (iOS, Android, Web)
- Home screen, sign-in/sign-up, and authenticated dashboard

### Backend (`packages/backend`)

- Convex backend (currently minimal setup)
- Ready for future feature expansion

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, Expo SDK 54, React 19
- **Authentication**: Clerk
- **Backend**: Convex
- **Styling**: Tailwind CSS (Web), StyleSheet (Native)
- **Package Manager**: pnpm
- **Build Tool**: Turbo 2.5.8

## 🚀 Getting Started

### Prerequisites

- Node.js 18.8.0 or higher
- pnpm (install with `npm install -g pnpm`)
- Expo CLI (install with `npm install -g @expo/cli`)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wrestling-club
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up Clerk Authentication**

   Create a Clerk account at [clerk.com](https://clerk.com) and get your API keys.

   For the **Web App** (`apps/web`):

   ```bash
   cd apps/web
   cp .env.example .env.local
   ```

   Add your Clerk keys to `.env.local`:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here
   NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
   ```

   For the **Native App** (`apps/native`):

   ```bash
   cd apps/native
   cp .env.example .env
   ```

   Add your keys to `.env`:

   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   EXPO_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
   ```

4. **Set up Convex Backend**

   Create a Convex account at [convex.dev](https://convex.dev) and set up your project.

   ```bash
   cd packages/backend
   npx convex dev
   ```

   This will give you a Convex URL that you need to add to your environment variables above.

### Running the Applications

#### Web App

```bash
# From the root directory - run all apps
pnpm dev

# Or run just the web app
pnpm dev --filter=web-app

# Or from the web app directory
cd apps/web
pnpm dev
```

The web app will be available at `http://localhost:3000`

#### Native App

```bash
# From the root directory - run all apps
pnpm dev

# Or run just the native app
pnpm dev --filter=native-app

# Or from the native app directory
cd apps/native
pnpm dev
```

Then:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app on your device

## 📁 Project Structure

```
wrestling-club/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   └── components/  # React components
│   │   └── package.json
│   └── native/              # Expo native application
│       ├── app/             # Expo Router screens
│       ├── src/             # Additional source files
│       └── package.json
├── packages/
│   └── backend/             # Convex backend
│       ├── convex/          # Convex functions
│       └── package.json
├── pnpm-workspace.yaml      # pnpm workspace configuration
├── turbo.json              # Turbo build configuration
└── package.json            # Root package.json
```

## 🔧 Development

### Available Scripts

From the root directory:

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm clean` - Clean all node_modules and build artifacts
- `pnpm format` - Format code with Prettier

### Adding New Features

1. **Web Features**: Add pages in `apps/web/src/app/` and components in `apps/web/src/components/`
2. **Native Features**: Add screens in `apps/native/app/` following Expo Router conventions
3. **Backend Features**: Add Convex functions in `packages/backend/convex/`

## 🔐 Authentication Flow

Both applications use Clerk for authentication:

1. **Home Page/Screen**: Landing page with sign-in option
2. **Sign In/Up**: Clerk's pre-built authentication components
3. **Dashboard**: Authenticated area with user information and logout

## 🚀 Deployment

### Web App

Deploy to Vercel, Netlify, or any platform that supports Next.js.

### Native App

- **iOS**: Build with EAS Build and submit to App Store
- **Android**: Build with EAS Build and submit to Google Play Store

## 📝 Environment Variables

### Web App (`.env.local`)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
```

### Native App (`.env`)

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both web and native
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Clerk documentation](https://clerk.com/docs)
2. Check the [Expo documentation](https://docs.expo.dev/)
3. Check the [Next.js documentation](https://nextjs.org/docs)
4. Open an issue in this repository
