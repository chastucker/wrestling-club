import React from "react";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";

type StatusType =
  | "paid"
  | "unpaid"
  | "practice"
  | "tournament"
  | "interested"
  | "accepted"
  | "declined"
  | "active"
  | "pending";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "paid":
        return {
          label: "Paid",
          className: "bg-success",
        };
      case "unpaid":
        return {
          label: "Unpaid",
          className: "bg-destructive",
        };
      case "practice":
        return {
          label: "Practice",
          className: "bg-blue-500",
        };
      case "tournament":
        return {
          label: "Tournament",
          className: "bg-purple-500",
        };
      case "interested":
        return {
          label: "Interested",
          className: "bg-warning",
        };
      case "accepted":
        return {
          label: "Accepted",
          className: "bg-success",
        };
      case "declined":
        return {
          label: "Declined",
          className: "bg-destructive",
        };
      case "active":
        return {
          label: "Active",
          className: "bg-success",
        };
      case "pending":
        return {
          label: "Pending",
          className: "bg-warning",
        };
      default:
        return {
          label: status,
          className: "bg-muted",
        };
    }
  };

  const { label, className } = getStatusConfig(status);

  const sizeClasses = {
    sm: "px-2 py-1",
    md: "px-3 py-1.5",
    lg: "px-4 py-2",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <Badge className={`${className} ${sizeClasses[size]}`}>
      <Text className={`text-white font-medium ${textSizeClasses[size]}`}>
        {label}
      </Text>
    </Badge>
  );
}
