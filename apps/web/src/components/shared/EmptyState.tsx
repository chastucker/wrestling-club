"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6">
        {icon && (
          <div className="text-6xl text-muted-foreground mb-4">{icon}</div>
        )}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-center mb-6 max-w-md">
            {description}
          </p>
        )}
        {action && (
          <Button
            onClick={action.onClick}
            className="bg-wrestling-primary hover:bg-wrestling-primary/90"
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
