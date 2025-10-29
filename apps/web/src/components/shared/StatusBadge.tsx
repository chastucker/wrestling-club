"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType =
  | "paid"
  | "unpaid"
  | "pending"
  | "confirmed"
  | "cancelled"
  | "present"
  | "absent"
  | "late"
  | "excused"
  | "interested"
  | "declined"
  | "active"
  | "inactive"
  | "practice"
  | "tournament"
  | "competition";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  paid: { label: "Paid", className: "bg-wrestling-success text-white" },
  unpaid: { label: "Unpaid", className: "bg-wrestling-danger text-white" },
  pending: { label: "Pending", className: "bg-wrestling-warning text-white" },
  confirmed: {
    label: "Confirmed",
    className: "bg-wrestling-success text-white",
  },
  cancelled: { label: "Cancelled", className: "bg-gray-500 text-white" },
  present: { label: "Present", className: "bg-wrestling-success text-white" },
  absent: { label: "Absent", className: "bg-wrestling-danger text-white" },
  late: { label: "Late", className: "bg-wrestling-warning text-white" },
  excused: { label: "Excused", className: "bg-gray-500 text-white" },
  interested: {
    label: "Interested",
    className: "bg-wrestling-primary text-white",
  },
  declined: { label: "Declined", className: "bg-gray-500 text-white" },
  active: { label: "Active", className: "bg-wrestling-success text-white" },
  inactive: { label: "Inactive", className: "bg-gray-500 text-white" },
  practice: { label: "Practice", className: "bg-wrestling-primary text-white" },
  tournament: {
    label: "Tournament",
    className: "bg-wrestling-warning text-white",
  },
  competition: {
    label: "Competition",
    className: "bg-wrestling-danger text-white",
  },
};

export const StatusBadge = ({
  status,
  size = "md",
  className = "",
}: StatusBadgeProps) => {
  const config = statusConfig[status];

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <Badge
      className={cn(config.className, sizeClasses[size], className)}
      variant="default"
    >
      {config.label}
    </Badge>
  );
};
