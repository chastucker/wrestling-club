import Link from "next/link";
import { getCurrentAppConfig } from "@/lib/config";

export default function HomePage() {
  const config = getCurrentAppConfig();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-wrestling-primary mb-6">
          {config.clubName}
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome to {config.name}. Join our community and start your wrestling
          journey.
        </p>

        <div className="space-y-4">
          <Link
            href="/sign-in"
            className="block w-full bg-wrestling-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-wrestling-primary/90 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="block w-full border border-wrestling-primary text-wrestling-primary py-3 px-4 rounded-lg font-medium hover:bg-wrestling-primary/5 transition-colors"
          >
            Create Account
          </Link>
          <p className="text-sm text-gray-500">
            Sign in to access your dashboard or create a new account.
          </p>
        </div>
      </div>
    </div>
  );
}
