import { View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert("Error", err.errors?.[0]?.message || "An error occurred");
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        console.log("Sign up not complete");
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors?.[0]?.message || "An error occurred");
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 bg-gray-50 p-5">
        <View className="items-center mt-10 mb-5">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Verify Email
          </Text>
          <Text className="text-base text-gray-500">
            Enter the verification code sent to your email
          </Text>
        </View>

        <View className="flex-1 justify-center">
          <View className="mb-5">
            <Text className="text-base font-semibold text-gray-800 mb-2">
              Verification Code
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-3 text-base"
              value={code}
              onChangeText={setCode}
              placeholder="Enter verification code"
              keyboardType="number-pad"
            />
          </View>

          <TouchableOpacity
            className="bg-green-600 py-3 px-6 rounded-lg items-center mt-5"
            onPress={onPressVerify}
          >
            <Text className="text-white text-base font-semibold">
              Verify Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 p-5">
      <View className="items-center mt-10 mb-5">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Sign Up</Text>
        <Text className="text-base text-gray-500">
          Join the Wrestling Club community
        </Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            First Name
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-3 text-base"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            autoCapitalize="words"
          />
        </View>

        <View className="mb-5">
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Last Name
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-3 text-base"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            autoCapitalize="words"
          />
        </View>

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
          onPress={onSignUpPress}
        >
          <Text className="text-white text-base font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center items-center mb-5">
        <Text className="text-sm text-gray-500 mr-1">
          Already have an account?
        </Text>
        <Link href="/sign-in" asChild>
          <TouchableOpacity>
            <Text className="text-sm text-blue-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
