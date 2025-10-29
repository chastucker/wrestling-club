import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotifications,
  scheduleCheckInReminder,
  scheduleEventReminder,
  sendCheckInNotification,
  sendPaymentReminder,
  cancelAllScheduledNotifications,
  getScheduledNotifications,
} from "@/lib/notifications";

export function useNotifications() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // Register for push notifications
    registerForPushNotifications();

    // Set up notification listeners
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
        // Handle notification tap here
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const schedulePracticeReminder = async (
    practiceDate: Date,
    practiceName: string,
  ) => {
    try {
      await scheduleCheckInReminder(practiceDate, practiceName);
    } catch (error) {
      console.error("Failed to schedule practice reminder:", error);
    }
  };

  const scheduleTournamentReminder = async (
    tournamentDate: Date,
    tournamentName: string,
  ) => {
    try {
      await scheduleEventReminder(tournamentDate, tournamentName);
    } catch (error) {
      console.error("Failed to schedule tournament reminder:", error);
    }
  };

  const notifyCheckInSuccess = async (practiceName: string) => {
    try {
      await sendCheckInNotification(practiceName);
    } catch (error) {
      console.error("Failed to send check-in notification:", error);
    }
  };

  const notifyPaymentDue = async (amount: number, description: string) => {
    try {
      await sendPaymentReminder(amount, description);
    } catch (error) {
      console.error("Failed to send payment reminder:", error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await cancelAllScheduledNotifications();
    } catch (error) {
      console.error("Failed to clear notifications:", error);
    }
  };

  const getScheduled = async () => {
    try {
      return await getScheduledNotifications();
    } catch (error) {
      console.error("Failed to get scheduled notifications:", error);
      return [];
    }
  };

  return {
    schedulePracticeReminder,
    scheduleTournamentReminder,
    notifyCheckInSuccess,
    notifyPaymentDue,
    clearAllNotifications,
    getScheduled,
  };
}
