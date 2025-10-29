"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { mockSessions } from "@/lib/mockData";
import { DollarSign, Calendar, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SessionEnrollPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { user } = useUserRole();
  const { canEnrollSessions } = useRoleAccess();
  const sessionId = params.id as string;
  const enrollmentType = searchParams.get("type") as
    | "per-session"
    | "per-practice"
    | null;

  const [selectedType, setSelectedType] = useState<
    "per-session" | "per-practice"
  >(enrollmentType || "per-session");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">Please sign in to continue.</p>
        </div>
      </div>
    );
  }

  if (!canEnrollSessions()) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to enroll in sessions.
          </p>
        </div>
      </div>
    );
  }

  // Find the session
  const session = mockSessions.find((s) => s.id === sessionId);

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Session Not Found
          </h1>
          <p className="text-gray-600">
            The session you're looking for doesn't exist.
          </p>
          <Link href="/sessions">
            <Button className="mt-4">Back to Sessions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = async () => {
    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);
  };

  const getPrice = () => {
    return selectedType === "per-session"
      ? session.pricePerSession
      : session.pricePerPractice;
  };

  const getDescription = () => {
    return selectedType === "per-session"
      ? "Pay once for the entire session"
      : "Pay for each individual practice you attend";
  };

  if (isSuccess) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-wrestling-success rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Enrollment Successful!
              </h1>
              <p className="text-gray-600">
                You have successfully enrolled in{" "}
                <strong>{session.name}</strong> with {selectedType} billing.
              </p>
              <div className="flex space-x-4 justify-center">
                <Link href="/sessions">
                  <Button variant="outline">Back to Sessions</Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="bg-wrestling-primary hover:bg-wrestling-primary/90">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Enroll in Session</h1>
        <p className="text-gray-600 mt-1">
          Complete your enrollment for {session.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Enrollment Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedType}
              onValueChange={(value) =>
                setSelectedType(value as "per-session" | "per-practice")
              }
            >
              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <RadioGroupItem
                  value="per-session"
                  id="per-session"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="per-session"
                    className="text-base font-medium cursor-pointer"
                  >
                    Per Session
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pay once for the entire session - best value
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <DollarSign className="h-4 w-4 text-wrestling-primary" />
                    <span className="text-lg font-bold text-wrestling-primary">
                      ${session.pricePerSession}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <RadioGroupItem
                  value="per-practice"
                  id="per-practice"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="per-practice"
                    className="text-base font-medium cursor-pointer"
                  >
                    Per Practice
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pay for each practice you attend - more flexible
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <DollarSign className="h-4 w-4 text-wrestling-primary" />
                    <span className="text-lg font-bold text-wrestling-primary">
                      ${session.pricePerPractice}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      per practice
                    </span>
                  </div>
                </div>
              </div>
            </RadioGroup>

            <div className="pt-4 border-t">
              <Button
                onClick={handleEnroll}
                disabled={isProcessing}
                className="w-full bg-wrestling-primary hover:bg-wrestling-primary/90"
              >
                {isProcessing ? "Processing..." : `Enroll Now - $${getPrice()}`}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Session Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Session Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{session.name}</h3>
              <p className="text-sm text-muted-foreground">
                {session.description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(session.startDate).toLocaleDateString()} -{" "}
                    {new Date(session.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Enrollments</p>
                  <p className="text-sm text-muted-foreground">
                    {session.enrollments.length}
                    {session.maxEnrollments && ` / ${session.maxEnrollments}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Selected Plan:</span>
                <Badge variant="outline">
                  {selectedType === "per-session"
                    ? "Per Session"
                    : "Per Practice"}
                </Badge>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">Price:</span>
                <span className="text-lg font-bold text-wrestling-primary">
                  ${getPrice()}
                  {selectedType === "per-practice" && " per practice"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {getDescription()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
