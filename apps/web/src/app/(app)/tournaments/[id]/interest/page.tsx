"use client";

import { useParams } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  mockTournaments,
  mockTournamentInterests,
  mockUsers,
} from "@/lib/mockData";
import { Weight, Users, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function TournamentInterestPage() {
  const params = useParams();
  const { user } = useUserRole();
  const { canManageTournaments } = useRoleAccess();
  const tournamentId = params.id as string;

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

  if (!canManageTournaments()) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to manage tournament interest.
          </p>
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

  // Get interests for this tournament
  const tournamentInterests = mockTournamentInterests.filter(
    (interest) => interest.tournamentId === tournamentId,
  );

  // Group interests by weight class
  const interestsByWeightClass = tournamentInterests.reduce(
    (groups, interest) => {
      const weightClass = tournament.weightClasses.find(
        (wc) => wc.id === interest.weightClass,
      );
      const weightClassName = weightClass ? weightClass.name : "Unknown";

      if (!groups[weightClassName]) {
        groups[weightClassName] = [];
      }
      groups[weightClassName].push(interest);
      return groups;
    },
    {} as Record<string, typeof tournamentInterests>,
  );

  const handleStatusChange = (
    interestId: string,
    status: "interested" | "confirmed" | "declined",
  ) => {
    // In a real app, this would be an API call
    console.log(`Changing interest ${interestId} to ${status}`);
  };

  const columns = [
    {
      key: "wrestler",
      label: "Wrestler",
      render: (interest: any) => {
        const user = mockUsers.find((u) => u.id === interest.userId);
        return user ? user.name : "Unknown User";
      },
    },
    {
      key: "weightClass",
      label: "Weight Class",
      render: (interest: any) => {
        const weightClass = tournament.weightClasses.find(
          (wc) => wc.id === interest.weightClass,
        );
        return weightClass
          ? `${weightClass.name} (${weightClass.minWeight}-${weightClass.maxWeight} lbs)`
          : "Unknown";
      },
    },
    {
      key: "status",
      label: "Status",
      render: (interest: any) => (
        <StatusBadge status={interest.status} size="sm" />
      ),
    },
    {
      key: "submittedAt",
      label: "Submitted",
      render: (interest: any) =>
        new Date(interest.submittedAt).toLocaleDateString(),
    },
    {
      key: "notes",
      label: "Notes",
      render: (interest: any) => interest.notes || "-",
    },
    {
      key: "actions",
      label: "Actions",
      render: (interest: any) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange(interest.id, "confirmed")}
            disabled={interest.status === "confirmed"}
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange(interest.id, "declined")}
            disabled={interest.status === "declined"}
          >
            <XCircle className="h-3 w-3 mr-1" />
            Decline
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tournament Interest
          </h1>
          <p className="text-gray-600 mt-1">
            Manage wrestler interest for {tournament.name}
          </p>
        </div>
        <Link href={`/tournaments/${tournament.id}`}>
          <Button variant="outline">Back to Tournament</Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Interest</p>
                <p className="text-2xl font-bold">
                  {tournamentInterests.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-wrestling-success" />
              <div>
                <p className="text-sm font-medium">Confirmed</p>
                <p className="text-2xl font-bold text-wrestling-success">
                  {
                    tournamentInterests.filter((i) => i.status === "confirmed")
                      .length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-wrestling-danger" />
              <div>
                <p className="text-sm font-medium">Declined</p>
                <p className="text-2xl font-bold text-wrestling-danger">
                  {
                    tournamentInterests.filter((i) => i.status === "declined")
                      .length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Weight className="h-4 w-4 text-wrestling-primary" />
              <div>
                <p className="text-sm font-medium">Weight Classes</p>
                <p className="text-2xl font-bold text-wrestling-primary">
                  {tournament.weightClasses.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interest by Weight Class */}
      {Object.keys(interestsByWeightClass).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(interestsByWeightClass).map(
            ([weightClassName, interests]) => (
              <Card key={weightClassName}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Weight className="h-5 w-5" />
                    <span>{weightClassName}</span>
                    <Badge variant="outline">
                      {interests.length} interested
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={interests}
                    columns={columns}
                    searchable={false}
                    filterable={false}
                    exportable={true}
                    onExport={() =>
                      console.log("Export interests for", weightClassName)
                    }
                    emptyMessage={`No interest shown for ${weightClassName}`}
                  />
                </CardContent>
              </Card>
            ),
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Interest Yet
              </h3>
              <p className="text-gray-600">
                No wrestlers have shown interest in this tournament yet.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
