import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";

const styles = StyleSheet.create({
  toastContainer: {
    height: 60,
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  text1: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  text2: {
    fontSize: 13,
    fontWeight: "400",
    color: "#6B7280",
  },
});

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[
        styles.toastContainer,
        {
          backgroundColor: "#F0FDF4",
          shadowColor: "#22C55E",
        },
      ]}
      contentContainerStyle={{ paddingHorizontal: 0, flex: 1 }}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: "#22C55E",
            },
          ]}
        >
          <Feather name="check" size={16} color="#FFFFFF" />
        </View>
      )}
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      style={[
        styles.toastContainer,
        {
          backgroundColor: "#EFF6FF",
          shadowColor: "#3B82F6",
        },
      ]}
      contentContainerStyle={{ paddingHorizontal: 0, flex: 1 }}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: "#3B82F6",
            },
          ]}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "700",
              fontStyle: "italic",
            }}
          >
            i
          </Text>
        </View>
      )}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[
        styles.toastContainer,
        {
          backgroundColor: "#FEF2F2",
          shadowColor: "#EF4444",
        },
      ]}
      contentContainerStyle={{ paddingHorizontal: 0, flex: 1 }}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: "#EF4444",
            },
          ]}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            !
          </Text>
        </View>
      )}
    />
  ),
};
