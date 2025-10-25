import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-50 p-5">
      <View className="bg-white rounded-lg p-6 mb-4">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Welcome!</Text>
        <Text className="text-gray-600">
          This is the home tab of your Wrestling Club app.
        </Text>
      </View>

      <View className="bg-white rounded-lg p-6 mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Quick Actions
        </Text>
        <Link href="/sign-in" className="block mb-2">
          <View className="bg-blue-600 py-3 px-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Sign In
            </Text>
          </View>
        </Link>
        <Link href="/dashboard" className="block">
          <View className="bg-green-600 py-3 px-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Dashboard
            </Text>
          </View>
        </Link>
      </View>
    </View>
  );
}
