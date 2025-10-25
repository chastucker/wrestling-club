import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import tokenCache from "@/utils/tokenCache";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL || "");

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}
    >
      <ConvexProvider client={convex}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
          <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
          <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
          <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
        </Stack>
        <StatusBar style="auto" />
      </ConvexProvider>
    </ClerkProvider>
  );
}
