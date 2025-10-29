import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Link, router } from "expo-router";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { SignInForm } from "@/types";

export default function SignInScreen() {
  const { signIn, isLoading, error } = useAuth();
  const [form, setForm] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      await signIn(form.email, form.password);
      router.replace("/(app)");
    } catch (err) {
      Alert.alert("Sign In Failed", error || "Please check your credentials");
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 justify-center p-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-foreground text-center mb-2">
            Welcome Back
          </Text>
          <Text className="text-muted-foreground text-center">
            Sign in to your wrestling club account
          </Text>
        </View>

        <Card className="p-6">
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-2">
                Email
              </Text>
              <Input
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, email: text }))
                }
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">
                Password
              </Text>
              <Input
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, password: text }))
                }
                secureTextEntry
                autoComplete="password"
              />
            </View>

            <Button
              onPress={handleSignIn}
              disabled={isLoading || !form.email || !form.password}
              className="bg-primary mt-6"
            >
              <Text className="text-primary-foreground font-medium">
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </Button>

            {error && (
              <Text className="text-destructive text-sm text-center mt-2">
                {error}
              </Text>
            )}
          </View>
        </Card>

        <View className="mt-6">
          <Text className="text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link href="/(auth)/sign-up" asChild>
              <Text className="text-primary font-medium">Sign up</Text>
            </Link>
          </Text>
        </View>

        <View className="mt-8 p-4 bg-muted rounded-lg">
          <Text className="text-sm text-muted-foreground text-center mb-2">
            Demo Credentials:
          </Text>
          <Text className="text-xs text-muted-foreground text-center">
            Email: john@example.com{"\n"}
            Password: password123
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
