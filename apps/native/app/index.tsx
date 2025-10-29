import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function IndexScreen() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/(app)");
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-lg text-foreground">Loading...</Text>
      </View>
    );
  }

  return null;
}
