"use client";

import { useState } from "react";
import { UserRole } from "@/types";
import { useUserRole } from "@/hooks/useUserRole";
import { RoleBadge } from "./RoleBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";

interface RoleSwitcherProps {
  className?: string;
}

export const RoleSwitcher = ({ className = "" }: RoleSwitcherProps) => {
  const { user, switchRole } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  if (!user || user.roles.length <= 1) {
    return null;
  }

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center space-x-2 ${className}`}
        >
          <RoleBadge role={user.currentRole} size="sm" />
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {user.roles.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => handleRoleSwitch(role)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <RoleBadge role={role} size="sm" />
            </div>
            {user.currentRole === role && (
              <Check className="h-4 w-4 text-wrestling-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
