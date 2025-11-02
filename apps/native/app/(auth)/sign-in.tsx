import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { z } from "zod/v4";
import { app } from "@packages/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { Text } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const logo = require("../../assets/dwc/logo/logoLarge.png");

const authFormSchema = z.object({
  emailAddress: z.email(),
  password: z.string().min(8),
});

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const insets = useSafeAreaInsets();

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: values.emailAddress,
        password: values.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        Toast.show({
          type: "success",
          text1: "Signed in successfully",
          text2: "Welcome back!",
        });
        router.push("/dashboard");
      } else {
        Toast.show({
          type: "info",
          text1: "Sign in incomplete",
          text2: "Please complete the sign-in process",
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Sign in failed",
        text2:
          err.errors?.[0]?.message || "An error occurred. Please try again.",
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
                style={{ width: 350, height: 200 }}
              >
                <Image
                  source={logo}
                  style={{ width: 350, height: 350 }}
                  contentFit="contain"
                  accessibilityLabel={`${app.clubName} logo`}
                />
              </View>
            </View>

            <View className="w-full max-w-md gap-6">
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

              <View className="gap-3 pt-2 pb-4">
                <Button
                  onPress={form.handleSubmit(onSubmit)}
                  disabled={form.formState.isSubmitting || !isLoaded}
                  className="h-12 w-full rounded-xl shadow-lg shadow-primary/20"
                >
                  {form.formState.isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-base font-semibold">Sign in</Text>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-xl border-border/60"
                  onPress={() => router.replace("/(auth)/sign-up")}
                >
                  <Text className="text-base font-semibold">
                    Create an account
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
