import { View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        // Handle other statuses
        console.log("Sign in not complete");
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors?.[0]?.message || "An error occurred");
    }
  };

  return (
    <View className="flex-1 bg-gray-50 p-5">
      <View className="items-center mt-10 mb-5">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Sign In</Text>
        <Text className="text-base text-gray-500">
          Welcome back to Wrestling Club
        </Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Email
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-3 text-base"
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Password
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-3 text-base"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="bg-blue-600 py-3 px-6 rounded-lg items-center mt-5"
          onPress={onSignInPress}
        >
          <Text className="text-white text-base font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center items-center mb-5">
        <Text className="text-sm text-gray-500 mr-1">
          Don&apos;t have an account?
        </Text>
        <Link href="/sign-up" asChild>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
