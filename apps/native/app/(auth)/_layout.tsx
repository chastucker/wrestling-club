import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            title: "Sign In",
            headerShown: true,
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
            headerShown: true,
            headerStyle: {
              backgroundColor: "#f8fafc",
            },
            headerTintColor: "#0f172a",
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
