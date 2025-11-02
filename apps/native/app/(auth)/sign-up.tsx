import React, { useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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
import { app } from "@packages/config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSignUp } from "@clerk/clerk-expo";

const logo = require(`../../assets/dwc/logo/logoLarge.png`);

const signUpSchema = z.object({
  emailAddress: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  code: z.string().optional(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const { signUp, setActive } = useSignUp();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<"credentials" | "verification">(
    "credentials",
  );
  const [pendingEmail, setPendingEmail] = useState<string>("");

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      code: "",
    },
    mode: "onBlur",
  });

  const handleCredentialsSubmit = async () => {
    const isValid = await form.trigger(["emailAddress", "password"]);
    if (!isValid) {
      return;
    }

    const values = form.getValues();
    if (!signUp) {
      Toast.show({
        type: "error",
        text1: "Sign up failed",
        text2: "Please try again.",
      });
      return;
    }

    try {
      const result = await signUp.create({
        emailAddress: values.emailAddress,
        password: values.password,
        firstName: "",
        lastName: "",
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        Toast.show({
          type: "success",
          text1: "Account created",
          text2: "Please complete your profile",
        });

        router.replace("/(app)/profile");
      } else {
        // Need email verification
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setPendingEmail(values.emailAddress);
        setStep("verification");
        form.setValue("code", "");
        Toast.show({
          type: "info",
          text1: "Verify your email",
          text2: "Check your email for a verification code",
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.errors?.[0]?.message || err?.message || "Please try again.";
      Toast.show({
        type: "error",
        text1: "Sign up failed",
        text2: errorMessage,
      });
    }
  };

  const handleVerificationSubmit = async () => {
    // Validate only code field
    const isValid = await form.trigger("code");
    if (!isValid) {
      return;
    }

    const code = form.getValues("code");
    if (!signUp) {
      Toast.show({
        type: "error",
        text1: "Verification failed",
        text2: "Please try again.",
      });
      return;
    }

    try {
      // Update schema to require code for verification step
      const codeValue = code || "";
      if (codeValue.length !== 6) {
        form.setError("code", {
          type: "manual",
          message: "Verification code must be 6 digits",
        });
        return;
      }

      const result = await signUp.attemptEmailAddressVerification({
        code: codeValue,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        Toast.show({
          type: "success",
          text1: "Account created",
          text2: "Please complete your profile",
        });

        router.replace("/(app)/profile");
      } else {
        Toast.show({
          type: "error",
          text1: "Verification incomplete",
          text2: "Please try again.",
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Verification failed",
        text2:
          err?.errors?.[0]?.message ||
          err?.message ||
          "Invalid code. Please try again.",
      });
    }
  };

  const resendCode = async () => {
    if (!signUp) {
      return;
    }

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      Toast.show({
        type: "success",
        text1: "Code resent",
        text2: "Check your email for a new verification code",
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Failed to resend code",
        text2: err?.errors?.[0]?.message || "Please try again.",
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
              {step === "credentials" ? (
                <>
                  <View className="gap-3">
                    <Label>Email</Label>
                    <Controller
                      control={form.control}
                      name="emailAddress"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          placeholder="you@example.com"
                          aria-invalid={!!form.formState.errors.emailAddress}
                          className="h-12"
                        />
                      )}
                    />
                    {form.formState.errors.emailAddress && (
                      <Text variant="muted">
                        {form.formState.errors.emailAddress.message}
                      </Text>
                    )}
                  </View>

                  <View className="gap-3">
                    <Label>Password</Label>
                    <Controller
                      control={form.control}
                      name="password"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          secureTextEntry
                          placeholder="••••••••"
                          aria-invalid={!!form.formState.errors.password}
                          className="h-12"
                        />
                      )}
                    />
                    {form.formState.errors.password && (
                      <Text variant="muted">
                        {form.formState.errors.password.message}
                      </Text>
                    )}
                  </View>

                  <View className="gap-3 pt-2">
                    <Button
                      onPress={handleCredentialsSubmit}
                      disabled={form.formState.isSubmitting}
                      className="h-12 w-full rounded-xl shadow-lg shadow-primary/20"
                    >
                      {form.formState.isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text className="text-base font-semibold">
                          Create account
                        </Text>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 w-full rounded-xl border-border/60"
                      onPress={() => router.replace("/(auth)/sign-in")}
                    >
                      <Text className="text-base font-semibold">
                        Sign in instead
                      </Text>
                    </Button>
                  </View>
                </>
              ) : (
                <>
                  <View className="gap-2 mb-2">
                    <Text className="text-center text-lg font-semibold">
                      Verify your email
                    </Text>
                    <Text variant="muted" className="text-center">
                      We sent a verification code to
                    </Text>
                    <Text variant="muted" className="text-center font-medium">
                      {pendingEmail}
                    </Text>
                  </View>

                  <View className="gap-3">
                    <Label>Verification Code</Label>
                    <Controller
                      control={form.control}
                      name="code"
                      rules={{
                        required: "Verification code is required",
                        minLength: {
                          value: 6,
                          message: "Verification code must be 6 digits",
                        },
                        maxLength: {
                          value: 6,
                          message: "Verification code must be 6 digits",
                        },
                        pattern: {
                          value: /^\d{6}$/,
                          message: "Verification code must be 6 digits",
                        },
                      }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value || ""}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="number-pad"
                          placeholder="000000"
                          maxLength={6}
                          aria-invalid={!!form.formState.errors.code}
                          className="h-12 text-center text-2xl font-mono tracking-widest"
                        />
                      )}
                    />
                    {form.formState.errors.code && (
                      <Text variant="muted">
                        {form.formState.errors.code.message}
                      </Text>
                    )}
                  </View>

                  <View className="gap-3 pt-2">
                    <Button
                      onPress={handleVerificationSubmit}
                      disabled={form.formState.isSubmitting}
                      className="h-12 w-full rounded-xl shadow-lg shadow-primary/20"
                    >
                      {form.formState.isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text className="text-base font-semibold">
                          Verify code
                        </Text>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 w-full rounded-xl border-border/60"
                      onPress={resendCode}
                      disabled={form.formState.isSubmitting}
                    >
                      <Text className="text-base font-semibold">
                        Resend code
                      </Text>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-12 w-full"
                      onPress={() => {
                        setStep("credentials");
                        form.setValue("code", "");
                      }}
                      disabled={form.formState.isSubmitting}
                    >
                      <Text className="text-base font-semibold text-muted-foreground">
                        Change email
                      </Text>
                    </Button>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
