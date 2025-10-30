import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "../global.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { PortalHost } from "@rn-primitives/portal";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaProvider } from "react-native-safe-area-context";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL || "");

export const unstable_settings = {
  anchor: "(app)",
};

export default function RootLayout() {
  return (
    <ClerkProvider>
      <AuthProvider>
        <ConvexProvider client={convex}>
          <SafeAreaProvider>
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
          </SafeAreaProvider>
        </ConvexProvider>
        <PortalHost />
      </AuthProvider>
    </ClerkProvider>
  );
}
