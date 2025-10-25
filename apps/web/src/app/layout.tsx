import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wrestling Club",
  description: "Wrestling Club App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en">
          <body className="min-h-screen bg-gray-50">{children}</body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
