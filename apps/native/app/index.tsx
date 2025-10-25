import { View, Text, TouchableOpacity } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-gray-50 justify-center items-center p-5">
      <View className="bg-white rounded-lg p-8 w-full max-w-sm shadow-lg">
        <Text className="text-3xl font-bold text-gray-800 text-center mb-4">
          Wrestling Club
        </Text>

        <Text className="text-gray-600 text-center mb-8 leading-6">
          Welcome to the Wrestling Club app. Join our community and start your
          wrestling journey.
        </Text>

        <SignedOut>
          <View className="items-center">
            <Link href="/sign-in" asChild>
              <TouchableOpacity className="bg-blue-600 py-3 px-8 rounded-lg w-full mb-4">
                <Text className="text-white text-center font-semibold text-lg">
                  Sign In
                </Text>
              </TouchableOpacity>
            </Link>
            <Text className="text-gray-500 text-center text-sm">
              Don&apos;t have an account? Sign in to create one.
            </Text>
          </View>
        </SignedOut>

        <SignedIn>
          <View className="items-center">
            <TouchableOpacity
              className="bg-green-600 py-3 px-8 rounded-lg w-full mb-4"
              onPress={() => router.push("/dashboard")}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Go to Dashboard
              </Text>
            </TouchableOpacity>
            <Text className="text-gray-500 text-center text-sm">
              Welcome back! Access your dashboard.
            </Text>
          </View>
        </SignedIn>
      </View>
    </View>
  );
}
