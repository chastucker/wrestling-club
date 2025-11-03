import React from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { Text } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Feather } from "@expo/vector-icons";
import { app } from "@packages/config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";

const logo = require("../../assets/dwc/logo/logoLarge.png");

const ROLES: {
  value: "pending_coach" | "parent" | "wrestler";
  label: string;
}[] = [
  { value: "wrestler", label: "Wrestler" },
  { value: "parent", label: "Parent" },
  { value: "pending_coach", label: "Coach" },
];

const profileSchema = z.object({
  role: z.enum(["pending_coach", "parent", "wrestler"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  city: z.string().min(1, "City is required"),
  state: z
    .string()
    .min(2, "State is required")
    .max(2, "State must be 2 letters"),
});

export default function ProfileSetupScreen() {
  const insets = useSafeAreaInsets();
  const createProfile = useMutation(api.profile.createProfile);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      role: "wrestler",
      firstName: "",
      lastName: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await createProfile({
        role: values.role,
        clubId: app.id,
        firstName: values.firstName,
        lastName: values.lastName,
        city: values.city,
        state: values.state.toUpperCase(),
      });

      Toast.show({
        type: "success",
        text1: "Profile created",
        text2: "Welcome to " + app.clubName,
      });
      router.replace("/(app)/(tabs)");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Profile creation failed",
        text2: err?.message || "Please try again.",
      });
    }
  };

  return (
    <View
      style={{
        paddingBottom: Math.max(insets.bottom, 24),
      }}
      className="flex-1 bg-background"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="flex-1 items-center justify-center gap-12 px-6 py-10">
            <View className="items-center" style={{ paddingTop: insets.top }}>
              <View
                className="items-center justify-center"
                style={{ width: 200, height: 120 }}
              >
                <Image
                  source={logo}
                  style={{ width: 200, height: 200 }}
                  contentFit="contain"
                  accessibilityLabel={`${app.clubName} logo`}
                />
              </View>
            </View>

            <View className="w-full max-w-md gap-6">
              <View className="gap-3">
                <Label>You are a...</Label>
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
                            className={`flex-1 items-center justify-center rounded-xl border px-4 py-4 ${
                              isActive
                                ? "bg-primary border-primary"
                                : "bg-background border-border"
                            }`}
                          >
                            <View className="items-center gap-2">
                              <Feather
                                name={
                                  role.value === "pending_coach"
                                    ? "users"
                                    : role.value === "parent"
                                      ? "user"
                                      : "award"
                                }
                                size={20}
                                color={isActive ? "#fff" : undefined}
                              />
                              <Text
                                className={`text-sm font-medium ${
                                  isActive
                                    ? "text-primary-foreground"
                                    : "text-foreground"
                                }`}
                              >
                                {role.label}
                              </Text>
                            </View>
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                />
              </View>

              <View className="gap-3">
                <Label>First name</Label>
                <Controller
                  control={form.control}
                  name="firstName"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="John"
                      aria-invalid={!!form.formState.errors.firstName}
                      className="h-12"
                    />
                  )}
                />
                {form.formState.errors.firstName && (
                  <Text variant="muted">
                    {form.formState.errors.firstName.message}
                  </Text>
                )}
              </View>

              <View className="gap-3">
                <Label>Last name</Label>
                <Controller
                  control={form.control}
                  name="lastName"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Doe"
                      aria-invalid={!!form.formState.errors.lastName}
                      className="h-12"
                    />
                  )}
                />
                {form.formState.errors.lastName && (
                  <Text variant="muted">
                    {form.formState.errors.lastName.message}
                  </Text>
                )}
              </View>

              <View className="gap-3">
                <Label>City</Label>
                <Controller
                  control={form.control}
                  name="city"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Springfield"
                      aria-invalid={!!form.formState.errors.city}
                      className="h-12"
                    />
                  )}
                />
                {form.formState.errors.city && (
                  <Text variant="muted">
                    {form.formState.errors.city.message}
                  </Text>
                )}
              </View>

              <View className="gap-3">
                <Label>State</Label>
                <Controller
                  control={form.control}
                  name="state"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="IL"
                      maxLength={2}
                      autoCapitalize="characters"
                      aria-invalid={!!form.formState.errors.state}
                      className="h-12"
                    />
                  )}
                />
                {form.formState.errors.state && (
                  <Text variant="muted">
                    {form.formState.errors.state.message}
                  </Text>
                )}
              </View>

              <View className="gap-3 pt-2">
                <Button
                  onPress={form.handleSubmit(onSubmit)}
                  disabled={form.formState.isSubmitting}
                  className="h-12 w-full rounded-xl shadow-lg shadow-primary/20"
                >
                  {form.formState.isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-base font-semibold">
                      Complete profile
                    </Text>
                  )}
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
