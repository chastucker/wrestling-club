import { View, Alert, ActivityIndicator } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { z } from "zod/v4";
import { app } from "@packages/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

const authFormSchema = z.object({
  emailAddress: z.email(),
  password: z.string().min(8),
});

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

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
        router.push("/dashboard");
      } else {
        // Handle other statuses
        console.log("Sign in not complete");
      }
    } catch (err: any) {
      console.log("got here");
      Alert.alert("Error", err.errors?.[0]?.message || "An error occurred");
    }
  };

  return (
    <View className="flex-1 bg-background px-5 py-10">
      <View className="flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="flex-row">
            <View className="flex-1 gap-1.5">
              <CardTitle>Sign in to {app.clubName}</CardTitle>
              <CardDescription>Enter your details to continue</CardDescription>
            </View>
          </CardHeader>
          <CardContent>
            <View className="w-full justify-center gap-4">
              <View className="gap-2">
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
                    />
                  )}
                />
                {form.formState.errors.emailAddress && (
                  <Text variant="muted">
                    {form.formState.errors.emailAddress.message}
                  </Text>
                )}
              </View>

              <View className="gap-2">
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
                    />
                  )}
                />
                {form.formState.errors.password && (
                  <Text variant="muted">
                    {form.formState.errors.password.message}
                  </Text>
                )}
              </View>
            </View>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              onPress={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting || !isLoaded}
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text>Sign In</Text>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onPress={() => router.replace("/(auth)/sign-up")}
            >
              <Text>sign up</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </View>
  );
}
