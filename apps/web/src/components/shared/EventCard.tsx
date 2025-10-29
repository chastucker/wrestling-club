"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: "practice" | "tournament" | "competition";
  status?: "active" | "inactive" | "completed";
  maxCapacity?: number;
  currentCapacity?: number;
  price?: number;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export const EventCard = ({
  id,
  title,
  description,
  date,
  startTime,
  endTime,
  location,
  type,
  status = "active",
  maxCapacity,
  currentCapacity,
  price,
  onAction,
  actionLabel,
  className = "",
}: EventCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            <StatusBadge status={type} size="sm" />
            {status && <StatusBadge status={status} size="sm" />}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatTime(startTime)} - {formatTime(endTime)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{location}</span>
          </div>
          {(maxCapacity || currentCapacity) && (
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {currentCapacity || 0}
                {maxCapacity && `/${maxCapacity}`}
              </span>
            </div>
          )}
        </div>

        {price && (
          <div className="text-lg font-semibold text-wrestling-primary">
            ${price}
          </div>
        )}

        {onAction && actionLabel && (
          <Button
            onClick={onAction}
            className="w-full bg-wrestling-primary hover:bg-wrestling-primary/90"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
