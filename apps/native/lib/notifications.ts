import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotifications() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Push notification token:", token);

  return token;
}

export async function scheduleCheckInReminder(
  practiceDate: Date,
  practiceName: string,
) {
  const reminderTime = new Date(practiceDate.getTime() - 30 * 60 * 1000); // 30 minutes before

  if (reminderTime > new Date()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Practice Reminder",
        body: `${practiceName} starts in 30 minutes!`,
        data: { type: "check-in", practiceId: practiceName },
      },
      trigger: reminderTime,
    });
  }
}

export async function scheduleEventReminder(
  eventDate: Date,
  eventName: string,
) {
  const reminderTime = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000); // 1 day before

  if (reminderTime > new Date()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Event Reminder",
        body: `${eventName} is tomorrow!`,
        data: { type: "event", eventName },
      },
      trigger: reminderTime,
    });
  }
}

export async function sendCheckInNotification(practiceName: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Check-in Successful!",
      body: `You've checked in to ${practiceName}`,
      data: { type: "check-in-success" },
    },
    trigger: null, // Send immediately
  });
}

export async function sendPaymentReminder(amount: number, description: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Payment Due",
      body: `Payment of $${amount} is due for ${description}`,
      data: { type: "payment", amount, description },
    },
    trigger: null, // Send immediately
  });
}

export async function cancelAllScheduledNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function getScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}
