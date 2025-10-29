"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";
import { Calendar, DollarSign, Users, Repeat } from "lucide-react";

interface SessionCardProps {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  repeatPattern: "weekly" | "biweekly" | "monthly" | "none";
  pricePerSession: number;
  pricePerPractice: number;
  maxEnrollments?: number;
  currentEnrollments?: number;
  isActive: boolean;
  enrollmentStatus?: "enrolled" | "not-enrolled" | "pending";
  onEnroll?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export const SessionCard = ({
  id,
  name,
  description,
  startDate,
  endDate,
  repeatPattern,
  pricePerSession,
  pricePerPractice,
  maxEnrollments,
  currentEnrollments = 0,
  isActive,
  enrollmentStatus,
  onEnroll,
  onViewDetails,
  className = "",
}: SessionCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRepeatLabel = (pattern: string) => {
    const labels = {
      weekly: "Weekly",
      biweekly: "Bi-weekly",
      monthly: "Monthly",
      none: "One-time",
    };
    return labels[pattern as keyof typeof labels] || pattern;
  };

  const getEnrollmentButton = () => {
    if (!isActive) {
      return (
        <Button disabled className="w-full">
          Session Inactive
        </Button>
      );
    }

    if (enrollmentStatus === "enrolled") {
      return (
        <Button onClick={onViewDetails} variant="outline" className="w-full">
          View Details
        </Button>
      );
    }

    if (enrollmentStatus === "pending") {
      return (
        <Button disabled className="w-full">
          Enrollment Pending
        </Button>
      );
    }

    return (
      <Button
        onClick={onEnroll}
        className="w-full bg-wrestling-primary hover:bg-wrestling-primary/90"
      >
        Enroll Now
      </Button>
    );
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            <StatusBadge status={isActive ? "active" : "inactive"} size="sm" />
            {enrollmentStatus && (
              <StatusBadge
                status={
                  enrollmentStatus === "enrolled" ? "confirmed" : "pending"
                }
                size="sm"
              />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Repeat className="h-4 w-4 text-muted-foreground" />
            <span>{getRepeatLabel(repeatPattern)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${pricePerSession}/session</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${pricePerPractice}/practice</span>
          </div>
        </div>

        {(maxEnrollments || currentEnrollments > 0) && (
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {currentEnrollments} enrolled
              {maxEnrollments && ` of ${maxEnrollments} max`}
            </span>
          </div>
        )}

        <div className="flex space-x-2">
          {getEnrollmentButton()}
          {onViewDetails && enrollmentStatus !== "enrolled" && (
            <Button
              onClick={onViewDetails}
              variant="outline"
              className="flex-1"
            >
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
