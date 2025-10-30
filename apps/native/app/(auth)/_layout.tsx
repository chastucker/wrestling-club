import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
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
