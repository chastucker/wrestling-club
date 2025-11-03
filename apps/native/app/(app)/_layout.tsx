import { Stack, Redirect, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import { app } from "@packages/config";
import { Text } from "@/components/ui/text";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-muted-foreground">Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <ProfileGuard>{children}</ProfileGuard>;
}

function ProfileGuard({ children }: { children: React.ReactNode }) {
  const profile = useQuery(api.profile.getProfile, { clubId: app.id });
  const segment = useSegments();
  const isProfileSetUp = segment[0] === "(app)" && segment[1] === "profile";

  if (profile === undefined) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-muted-foreground">Loading...</Text>
      </View>
    );
  }

  if (profile.length === 0 && !isProfileSetUp) {
    return <Redirect href="/(app)/profile" />;
  }

  return <>{children}</>;
}

export default function AppLayout() {
  return (
    <>
      <AuthGuard>
        <Stack>
          <Stack.Screen
            name="profile"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sessions/[id]"
            options={{
              title: "Session Details",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="sessions/[id]/enroll"
            options={{
              title: "Enroll",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="tournaments/[id]"
            options={{
              title: "Tournament Details",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="tournaments/[id]/interest"
            options={{
              title: "Show Interest",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="tournaments/[id]/manage"
            options={{
              title: "Manage Tournament",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="relationships/index"
            options={{
              title: "Relationships",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="check-in/index"
            options={{
              title: "Check In",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="payments/index"
            options={{
              title: "Payments",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="events/index"
            options={{
              title: "Events",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="events/[id]/roster"
            options={{
              title: "Event Roster",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="admin/sessions"
            options={{
              title: "Manage Sessions",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="admin/tournaments"
            options={{
              title: "Manage Tournaments",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="admin/members"
            options={{
              title: "Manage Members",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
          <Stack.Screen
            name="admin/payments"
            options={{
              title: "Payment Overview",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f8fafc",
              },
              headerTintColor: "#0f172a",
            }}
          />
        </Stack>
      </AuthGuard>
      <StatusBar style="dark" />
    </>
  );
}
