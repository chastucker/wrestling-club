import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { AppHeader } from "@/components/shared/AppHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";
import { getPaymentsByUserId, mockSessions } from "@/lib/mockData";
import { formatDate } from "@/lib/dateUtils";

export default function PaymentsScreen() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");

  const userPayments = getPaymentsByUserId(user?.id || "");
  const filteredPayments = userPayments.filter((payment) => {
    if (filter === "all") return true;
    return payment.status === filter;
  });

  const getPaymentDescription = (payment: (typeof userPayments)[0]) => {
    if (payment.sessionId) {
      const session = mockSessions.find((s) => s.id === payment.sessionId);
      return session ? `${session.name} - Full Session` : "Session Payment";
    }
    if (payment.practiceId) {
      return "Single Practice";
    }
    return payment.description;
  };

  const handleFilterChange = (newFilter: "all" | "paid" | "unpaid") => {
    setFilter(newFilter);
  };

  if (userPayments.length === 0) {
    return (
      <View className="flex-1 bg-background">
        <AppHeader title="Payments" />
        <EmptyState
          title="No Payments Found"
          description="Your payment history will appear here."
          icon="creditcard"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <AppHeader title="Payments" />

      <View className="p-4">
        {/* Filter Buttons */}
        <View className="flex-row space-x-2 mb-4">
          {(["all", "paid", "unpaid"] as const).map((filterType) => (
            <TouchableOpacity
              key={filterType}
              onPress={() => handleFilterChange(filterType)}
              className={`px-4 py-2 rounded-lg ${
                filter === filterType ? "bg-primary" : "bg-muted"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  filter === filterType
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payments List */}
        <ScrollView className="flex-1">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="p-4 mb-3">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-foreground mb-1">
                    {getPaymentDescription(payment)}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {formatDate(payment.date)}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-lg font-bold text-foreground mb-1">
                    ${payment.amount}
                  </Text>
                  <StatusBadge status={payment.status} size="sm" />
                </View>
              </View>

              {payment.paymentMethod && (
                <Text className="text-xs text-muted-foreground">
                  Paid via {payment.paymentMethod}
                </Text>
              )}
            </Card>
          ))}
        </ScrollView>

        {/* Summary */}
        <Card className="p-4 mt-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-foreground">
              Total{" "}
              {filter === "all"
                ? "Payments"
                : filter === "paid"
                  ? "Paid"
                  : "Outstanding"}
            </Text>
            <Text className="text-xl font-bold text-foreground">
              $
              {filteredPayments.reduce(
                (sum, payment) => sum + payment.amount,
                0,
              )}
            </Text>
          </View>
        </Card>
      </View>
    </View>
  );
}
