import React from "react";
import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import { Link, router } from "expo-router";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text } from "@/components/ui/text";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { app } from "@packages/config";

const ROLES: { value: UserRole; label: string }[] = [
  { value: "coach", label: "Coach" },
  { value: "parent", label: "Parent" },
  { value: "wrestler", label: "Wrestler" },
];

const signUpSchema = z.object({
  emailAddress: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["coach", "parent", "wrestler"]),
});

export default function SignUpScreen() {
  const { signUp, isLoading, error } = useAuth();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      role: "parent",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (
    values,
  ) => {
    try {
      await signUp(
        "",
        values.emailAddress,
        values.password,
        values.role,
        undefined,
      );
      router.replace("/dashboard");
    } catch (err: any) {
      Alert.alert(
        "Sign Up Failed",
        err?.message || error || "Please try again",
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6 py-10">
        <View className="mb-6">
          <Text className="text-[32px] font-bold text-foreground text-left mb-1">
            Create Account
          </Text>
          <Text className="text-muted-foreground text-left text-base">
            Join the {app.clubName} platform
          </Text>
        </View>

        <View className="gap-6 border border-border rounded-2xl p-6 bg-background shadow-sm shadow-black/5">
          <View className="gap-3">
            <Text className="text-sm font-medium text-foreground">
              Choose Your Role
            </Text>
            <Controller
              control={form.control}
              name="role"
              render={({ field: { value, onChange } }) => (
                <View className="flex-row gap-3">
                  {ROLES.map((role) => {
                    const isActive = value === role.value;
                    return (
                      <Pressable
                        key={role.value}
                        onPress={() => onChange(role.value)}
                        className={
                          "flex-1 items-center justify-center rounded-xl border px-4 py-4" +
                          (isActive
                            ? " bg-primary border-primary"
                            : " bg-muted/20 border-border")
                        }
                        accessibilityRole="button"
                      >
                        <Feather
                          name={(
                            role.value === "coach"
                              ? "users"
                              : role.value === "parent"
                                ? "user"
                                : "award"
                          ) as any}
                          size={22}
                          color={isActive ? "#fff" : undefined}
                        />
                        <Text
                          className={
                            "mt-2 text-sm font-medium text-white" +
                            (isActive
                              ? " text-primary-foreground"
                              : " text-foreground")
                          }
                        >
                          {role.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            />
          </View>

          <View className="gap-3">
            <Text className="text-sm font-medium text-foreground">Email</Text>
            <Controller
              control={form.control}
              name="emailAddress"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  className="dark:bg-input/30 border-input bg-background text-foreground h-12 w-full rounded-md border px-3 text-base shadow-sm shadow-black/5"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="your.email@example.com"
                />
              )}
            />
            {form.formState.errors.emailAddress && (
              <Text className="text-muted-foreground">
                {form.formState.errors.emailAddress.message}
              </Text>
            )}
          </View>

          <View className="gap-3">
            <Text className="text-sm font-medium text-foreground">
              Password
            </Text>
            <Controller
              control={form.control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  className="dark:bg-input/30 border-input bg-background text-foreground h-12 w-full rounded-md border px-3 text-base shadow-sm shadow-black/5"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  placeholder="••••••••"
                />
              )}
            />
            {form.formState.errors.password && (
              <Text className="text-muted-foreground">
                {form.formState.errors.password.message}
              </Text>
            )}
          </View>

          <Pressable
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting || isLoading}
            className="mt-2 h-12 items-center justify-center rounded-md bg-primary"
          >
            {form.formState.isSubmitting || isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-primary-foreground font-medium">
                Continue
              </Text>
            )}
          </Pressable>

          {error && (
            <Text className="text-destructive text-sm text-center">
              {error}
            </Text>
          )}
        </View>

        <View className="mt-8">
          <Text className="text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/sign-in" asChild>
              <Text className="text-primary font-medium">Sign in</Text>
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
