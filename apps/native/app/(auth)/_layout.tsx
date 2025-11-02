import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right"]}
    >
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            title: "Sign In",
            headerShown: false,
            headerStyle: {
              backgroundColor: "#f8fafc",
            },
            headerTintColor: "#0f172a",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: "Sign Up",
            headerShown: false,
            headerStyle: {
              backgroundColor: "#f8fafc",
            },
            headerTintColor: "#0f172a",
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
