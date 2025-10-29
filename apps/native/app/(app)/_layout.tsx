import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
  return (
    <>
      <Stack>
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
      <StatusBar style="dark" />
    </>
  );
}
