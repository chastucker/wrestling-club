import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "../global.css";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/toast-config";

import { AuthProvider } from "@/contexts/AuthContext";
import { PortalHost } from "@rn-primitives/portal";
import { ClerkProvider } from "@clerk/clerk-expo";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import tokenCache from "@/utils/tokenCache";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL || "");

export const unstable_settings = {
  anchor: "(app)",
};

function ToastWrapper() {
  const insets = useSafeAreaInsets();
  return <Toast config={toastConfig} topOffset={insets.top} />;
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <SafeAreaProvider>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <AuthProvider>
          <ConvexProvider client={convex}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ConvexProvider>
          <PortalHost />
        </AuthProvider>
      </ClerkProvider>
      <ToastWrapper />
    </SafeAreaProvider>
  );
}
