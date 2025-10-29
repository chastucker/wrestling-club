"use client";

import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRelationships, mockInvites, mockUsers } from "@/lib/mockData";
import {
  Users,
  UserPlus,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export default function RelationshipsPage() {
  const { user } = useUserRole();
  const { canManageRelationships } = useRoleAccess();
  const [activeTab, setActiveTab] = useState("current");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteType, setInviteType] = useState<"parent" | "wrestler">("parent");
  const [isSendingInvite, setIsSendingInvite] = useState(false);

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

  if (!canManageRelationships()) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to manage relationships.
          </p>
        </div>
      </div>
    );
  }

  // Get user's relationships
  const userRelationships = mockRelationships.filter(
    (rel) => rel.parentId === user.id || rel.wrestlerId === user.id,
  );

  // Get user's invites
  const userInvites = mockInvites.filter(
    (invite) => invite.fromUserId === user.id,
  );

  const handleSendInvite = async () => {
    if (!inviteEmail && !invitePhone) return;

    setIsSendingInvite(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSendingInvite(false);
    setInviteEmail("");
    setInvitePhone("");
  };

  const handleAcceptRelationship = (relationshipId: string) => {
    // In a real app, this would be an API call
    console.log("Accepting relationship:", relationshipId);
  };

  const handleDeclineRelationship = (relationshipId: string) => {
    // In a real app, this would be an API call
    console.log("Declining relationship:", relationshipId);
  };

  const relationshipColumns = [
    {
      key: "type",
      label: "Type",
      render: (rel: any) => {
        const isParent = rel.parentId === user.id;
        return isParent ? "Parent" : "Wrestler";
      },
    },
    {
      key: "connectedUser",
      label: "Connected User",
      render: (rel: any) => {
        const connectedUserId =
          rel.parentId === user.id ? rel.wrestlerId : rel.parentId;
        const connectedUser = mockUsers.find((u) => u.id === connectedUserId);
        return connectedUser ? connectedUser.name : "Unknown User";
      },
    },
    {
      key: "status",
      label: "Status",
      render: (rel: any) => <StatusBadge status={rel.status} size="sm" />,
    },
    {
      key: "confirmedAt",
      label: "Connected",
      render: (rel: any) =>
        rel.confirmedAt ? new Date(rel.confirmedAt).toLocaleDateString() : "-",
    },
    {
      key: "actions",
      label: "Actions",
      render: (rel: any) => (
        <div className="flex space-x-2">
          {rel.status === "pending" && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAcceptRelationship(rel.id)}
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDeclineRelationship(rel.id)}
              >
                <XCircle className="h-3 w-3 mr-1" />
                Decline
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const inviteColumns = [
    {
      key: "toEmail",
      label: "Email",
      render: (invite: any) => invite.toEmail,
    },
    {
      key: "toPhone",
      label: "Phone",
      render: (invite: any) => invite.toPhone || "-",
    },
    {
      key: "type",
      label: "Type",
      render: (invite: any) =>
        invite.type.charAt(0).toUpperCase() + invite.type.slice(1),
    },
    {
      key: "status",
      label: "Status",
      render: (invite: any) => <StatusBadge status={invite.status} size="sm" />,
    },
    {
      key: "createdAt",
      label: "Sent",
      render: (invite: any) => new Date(invite.createdAt).toLocaleDateString(),
    },
    {
      key: "expiresAt",
      label: "Expires",
      render: (invite: any) => new Date(invite.expiresAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relationships</h1>
        <p className="text-gray-600 mt-1">
          Manage your parent-wrestler connections
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Links</TabsTrigger>
          <TabsTrigger value="pending">Pending Invites</TabsTrigger>
          <TabsTrigger value="invite">Send Invite</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Current Relationships</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userRelationships.length > 0 ? (
                <DataTable
                  data={userRelationships}
                  columns={relationshipColumns}
                  searchable={false}
                  filterable={false}
                  exportable={false}
                  emptyMessage="No relationships found"
                />
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Relationships
                  </h3>
                  <p className="text-gray-600">
                    You don't have any parent-wrestler relationships yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Pending Invites</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userInvites.length > 0 ? (
                <DataTable
                  data={userInvites}
                  columns={inviteColumns}
                  searchable={false}
                  filterable={false}
                  exportable={false}
                  emptyMessage="No pending invites"
                />
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Pending Invites
                  </h3>
                  <p className="text-gray-600">
                    You haven't sent any invites yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invite" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Send Invite</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="Enter email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-phone">Phone Number (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="invite-phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={invitePhone}
                      onChange={(e) => setInvitePhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Invite Type</Label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="inviteType"
                      value="parent"
                      checked={inviteType === "parent"}
                      onChange={(e) =>
                        setInviteType(e.target.value as "parent" | "wrestler")
                      }
                    />
                    <span>Parent</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="inviteType"
                      value="wrestler"
                      checked={inviteType === "wrestler"}
                      onChange={(e) =>
                        setInviteType(e.target.value as "parent" | "wrestler")
                      }
                    />
                    <span>Wrestler</span>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleSendInvite}
                disabled={(!inviteEmail && !invitePhone) || isSendingInvite}
                className="w-full bg-wrestling-primary hover:bg-wrestling-primary/90"
              >
                {isSendingInvite ? "Sending..." : "Send Invite"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
