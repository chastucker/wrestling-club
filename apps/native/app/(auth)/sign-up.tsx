import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Link, router } from "expo-router";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { SignUpForm, UserRole } from "@/types";

const ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: "wrestler", label: "Wrestler", description: "I am a wrestler" },
  {
    value: "parent",
    label: "Parent",
    description: "I am a parent of a wrestler",
  },
  { value: "coach", label: "Coach", description: "I am a coach" },
];

export default function SignUpScreen() {
  const { signUp, isLoading, error } = useAuth();
  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "wrestler",
  });

  const handleSignUp = async () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await signUp(form.name, form.email, form.password, form.role, form.phone);
      router.replace("/(app)");
    } catch (err) {
      Alert.alert("Sign Up Failed", error || "Please try again");
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 justify-center p-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-foreground text-center mb-2">
            Create Account
          </Text>
          <Text className="text-muted-foreground text-center">
            Join the wrestling club community
          </Text>
        </View>

        <Card className="p-6">
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-2">
                Full Name
              </Text>
              <Input
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, name: text }))
                }
                autoComplete="name"
              />
            </View>

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
                Phone (Optional)
              </Text>
              <Input
                placeholder="Enter your phone number"
                value={form.phone || ""}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, phone: text }))
                }
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">
                Role
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {ROLES.map((role) => (
                  <Button
                    key={role.value}
                    onPress={() =>
                      setForm((prev) => ({ ...prev, role: role.value }))
                    }
                    className={`mr-2 mb-2 ${
                      form.role === role.value ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        form.role === role.value
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {role.label}
                    </Text>
                  </Button>
                ))}
              </View>
              <Text className="text-xs text-muted-foreground mt-1">
                {ROLES.find((r) => r.value === form.role)?.description}
              </Text>
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">
                Password
              </Text>
              <Input
                placeholder="Create a password"
                value={form.password}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, password: text }))
                }
                secureTextEntry
                autoComplete="new-password"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">
                Confirm Password
              </Text>
              <Input
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, confirmPassword: text }))
                }
                secureTextEntry
                autoComplete="new-password"
              />
            </View>

            <Button
              onPress={handleSignUp}
              disabled={
                isLoading ||
                !form.name ||
                !form.email ||
                !form.password ||
                !form.confirmPassword
              }
              className="bg-primary mt-6"
            >
              <Text className="text-primary-foreground font-medium">
                {isLoading ? "Creating Account..." : "Create Account"}
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
            Already have an account?{" "}
            <Link href="/(auth)/sign-in" asChild>
              <Text className="text-primary font-medium">Sign in</Text>
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
