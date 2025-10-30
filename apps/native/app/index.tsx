import { Redirect } from "expo-router";

import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { useUser } from "@clerk/clerk-expo";

export default function IndexScreen() {
  const { isLoaded, user } = useUser();

  if (isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-lg text-foreground">Loading...</Text>
      </View>
    );
  }

  if (user) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}
