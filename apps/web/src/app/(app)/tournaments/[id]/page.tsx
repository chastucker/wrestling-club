"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockTournaments } from "@/lib/mockData";
import {
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Trophy,
  Weight,
} from "lucide-react";
import Link from "next/link";

export default function TournamentDetailPage() {
  const params = useParams();
  const { user } = useUserRole();
  const { canShowTournamentInterest, canManageTournaments } = useRoleAccess();
  const tournamentId = params.id as string;

  const [selectedWeightClass, setSelectedWeightClass] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Find the tournament
  const tournament = mockTournaments.find((t) => t.id === tournamentId);

  if (!tournament) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tournament Not Found
          </h1>
          <p className="text-gray-600">
            The tournament you're looking for doesn't exist.
          </p>
          <Link href="/tournaments">
            <Button className="mt-4">Back to Tournaments</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShowInterest = async () => {
    if (!selectedWeightClass) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isSuccess) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-wrestling-success rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Interest Submitted!
              </h1>
              <p className="text-gray-600">
                You have successfully shown interest in{" "}
                <strong>{tournament.name}</strong>.
                {canManageTournaments() &&
                  " Coaches will review your interest and contact you with next steps."}
              </p>
              <div className="flex space-x-4 justify-center">
                <Link href="/tournaments">
                  <Button variant="outline">Back to Tournaments</Button>
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {tournament.name}
          </h1>
          <p className="text-gray-600 mt-1">{tournament.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={tournament.isActive ? "default" : "secondary"}>
            {tournament.isActive ? "Active" : "Inactive"}
          </Badge>
          {canManageTournaments() && (
            <Button variant="outline">Manage Tournament</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tournament Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Tournament Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(new Date(tournament.date))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {tournament.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Entry Fee</p>
                    <p className="text-sm text-muted-foreground">
                      {tournament.entryFee ? `$${tournament.entryFee}` : "Free"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Max Participants</p>
                    <p className="text-sm text-muted-foreground">
                      {tournament.maxParticipants || "Unlimited"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weight Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Weight Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tournament.weightClasses.map((weightClass) => (
                  <div
                    key={weightClass.id}
                    className="flex items-center space-x-2 p-3 border rounded-lg"
                  >
                    <Weight className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{weightClass.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {weightClass.minWeight}-{weightClass.maxWeight} lbs •{" "}
                        {weightClass.ageGroup}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interest Management (for coaches/admins) */}
          {canManageTournaments() && (
            <Card>
              <CardHeader>
                <CardTitle>Interest Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View and manage wrestler interest in this tournament.
                </p>
                <Link href={`/tournaments/${tournament.id}/interest`}>
                  <Button className="bg-wrestling-primary hover:bg-wrestling-primary/90">
                    View Interest by Weight Class
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Show Interest Form */}
          {canShowTournamentInterest() && (
            <Card>
              <CardHeader>
                <CardTitle>Show Interest</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weight-class">Weight Class *</Label>
                  <Select
                    value={selectedWeightClass}
                    onValueChange={setSelectedWeightClass}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your weight class" />
                    </SelectTrigger>
                    <SelectContent>
                      {tournament.weightClasses.map((weightClass) => (
                        <SelectItem key={weightClass.id} value={weightClass.id}>
                          {weightClass.name} ({weightClass.minWeight}-
                          {weightClass.maxWeight} lbs)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleShowInterest}
                  disabled={!selectedWeightClass || isSubmitting}
                  className="w-full bg-wrestling-primary hover:bg-wrestling-primary/90"
                >
                  {isSubmitting ? "Submitting..." : "Show Interest"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Tournament Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Tournament Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Weight Classes
                </span>
                <span className="text-sm font-medium">
                  {tournament.weightClasses.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Interests</span>
                <span className="text-sm font-medium">
                  {tournament.interests.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Teams</span>
                <span className="text-sm font-medium">
                  {tournament.teams.length}
                </span>
              </div>
              {tournament.entryFee && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Entry Fee
                  </span>
                  <span className="text-sm font-medium">
                    ${tournament.entryFee}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
