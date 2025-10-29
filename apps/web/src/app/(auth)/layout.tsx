"use client";

import { ReactNode, useEffect } from "react";
import { getCurrentAppConfig, applyTheme } from "@/lib/config";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  // Apply theme on mount
  useEffect(() => {
    const config = getCurrentAppConfig();
    applyTheme(config);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-wrestling-primary">
              {getCurrentAppConfig().clubName}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {getCurrentAppConfig().name}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
