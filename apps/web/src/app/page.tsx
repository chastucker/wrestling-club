import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Wrestling Club
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome to the Wrestling Club app. Join our community and start your
          wrestling journey.
        </p>

        <SignedOut>
          <div className="space-y-4">
            <SignInButton mode="modal">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <p className="text-sm text-gray-500">
              Don't have an account? Sign in to create one.
            </p>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Go to Dashboard
            </Link>
            <p className="text-sm text-gray-500">
              Welcome back! Access your dashboard.
            </p>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
