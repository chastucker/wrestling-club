import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SignedOut>{redirect("/")}</SignedOut>

      <SignedIn>
        <DashboardContent />
      </SignedIn>
    </div>
  );
}

function DashboardContent() {
  const { user } = useUser();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.firstName || "Wrestler"}!
            </h1>
            <p className="text-gray-600 mt-1">Manage your wrestling journey</p>
          </div>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Training Sessions
          </h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Matches Won
          </h3>
          <p className="text-3xl font-bold text-green-600">8</p>
          <p className="text-sm text-gray-500 mt-1">This season</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Weight Class
          </h3>
          <p className="text-3xl font-bold text-purple-600">145</p>
          <p className="text-sm text-gray-500 mt-1">lbs</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h3 className="font-medium text-gray-900">Schedule Training</h3>
            <p className="text-sm text-gray-500 mt-1">
              Book your next training session
            </p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h3 className="font-medium text-gray-900">View Matches</h3>
            <p className="text-sm text-gray-500 mt-1">Check upcoming matches</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h3 className="font-medium text-gray-900">Track Progress</h3>
            <p className="text-sm text-gray-500 mt-1">
              Monitor your improvement
            </p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h3 className="font-medium text-gray-900">Connect</h3>
            <p className="text-sm text-gray-500 mt-1">Chat with teammates</p>
          </button>
        </div>
      </div>
    </div>
  );
}
