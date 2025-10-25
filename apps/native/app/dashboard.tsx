import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <SignedOut>
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-lg text-gray-600 mb-5 text-center">
            Please sign in to access the dashboard
          </Text>
          <TouchableOpacity
            className="bg-blue-600 py-3 px-6 rounded-lg"
            onPress={() => router.push("/sign-in")}
          >
            <Text className="text-white text-base font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </SignedOut>

      <SignedIn>
        <DashboardContent />
      </SignedIn>
    </View>
  );
}

function DashboardContent() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
      {/* Header */}
      <View className="bg-white rounded-lg p-5 mb-5 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-800">
              Welcome, {user?.firstName || "Wrestler"}!
            </Text>
            <Text className="text-gray-600 mt-1">
              Manage your wrestling journey
            </Text>
          </View>
          <TouchableOpacity
            className="bg-red-500 py-2 px-4 rounded-lg"
            onPress={handleSignOut}
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="flex-row justify-between mb-5">
        <View className="bg-white rounded-lg p-4 flex-1 mr-2 shadow-sm">
          <Text className="text-sm text-gray-600 mb-1">Training Sessions</Text>
          <Text className="text-2xl font-bold text-blue-600">12</Text>
          <Text className="text-xs text-gray-500">This month</Text>
        </View>

        <View className="bg-white rounded-lg p-4 flex-1 mx-1 shadow-sm">
          <Text className="text-sm text-gray-600 mb-1">Matches Won</Text>
          <Text className="text-2xl font-bold text-green-600">8</Text>
          <Text className="text-xs text-gray-500">This season</Text>
        </View>

        <View className="bg-white rounded-lg p-4 flex-1 ml-2 shadow-sm">
          <Text className="text-sm text-gray-600 mb-1">Weight Class</Text>
          <Text className="text-2xl font-bold text-purple-600">145</Text>
          <Text className="text-xs text-gray-500">lbs</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View>
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Quick Actions
        </Text>

        <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-1">
            Schedule Training
          </Text>
          <Text className="text-gray-600">Book your next training session</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-1">
            View Matches
          </Text>
          <Text className="text-gray-600">Check upcoming matches</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-1">
            Track Progress
          </Text>
          <Text className="text-gray-600">Monitor your improvement</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-1">
            Connect
          </Text>
          <Text className="text-gray-600">Chat with teammates</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
