import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { AppHeader } from "@/components/shared/AppHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";
import { getRelationshipsByUserId, mockUsers } from "@/lib/mockData";

export default function RelationshipsScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"current" | "pending">("current");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);

  const userRelationships = getRelationshipsByUserId(user?.id || "");
  const currentRelationships = userRelationships.filter(
    (rel) => rel.status === "active",
  );
  const pendingRelationships = userRelationships.filter(
    (rel) => rel.status === "pending",
  );

  const getUserName = (userId: string) => {
    const foundUser = mockUsers.find((u) => u.id === userId);
    return foundUser?.name || "Unknown User";
  };

  const handleSendInvite = async () => {
    if (!inviteEmail.trim()) return;

    setIsInviting(true);
    try {
      // In a real app, this would make an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate adding to pending relationships
      console.log("Invite sent to:", inviteEmail);
      setInviteEmail("");
    } catch (error) {
      console.error("Failed to send invite:", error);
    } finally {
      setIsInviting(false);
    }
  };

  const renderCurrentRelationships = () => {
    if (currentRelationships.length === 0) {
      return (
        <EmptyState
          title="No Active Relationships"
          description="You don't have any active parent-wrestler relationships yet."
          icon="person.2"
        />
      );
    }

    return (
      <ScrollView className="flex-1">
        {currentRelationships.map((relationship) => (
          <Card key={relationship.id} className="p-4 mb-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-foreground">
                  {getUserName(relationship.wrestlerId)}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {user?.id === relationship.parentId ? "Wrestler" : "Parent"}
                </Text>
              </View>
              <StatusBadge status="active" size="sm" />
            </View>
          </Card>
        ))}
      </ScrollView>
    );
  };

  const renderPendingRelationships = () => {
    if (pendingRelationships.length === 0) {
      return (
        <EmptyState
          title="No Pending Invites"
          description="You don't have any pending relationship invites."
          icon="clock"
        />
      );
    }

    return (
      <ScrollView className="flex-1">
        {pendingRelationships.map((relationship) => (
          <Card key={relationship.id} className="p-4 mb-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-foreground">
                  {getUserName(relationship.wrestlerId)}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Invite sent by {getUserName(relationship.invitedBy)}
                </Text>
              </View>
              <StatusBadge status="pending" size="sm" />
            </View>
          </Card>
        ))}
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <AppHeader title="Relationships" />

      <View className="flex-1 p-4">
        {/* Invite Section */}
        <Card className="p-4 mb-6">
          <Text className="text-lg font-semibold text-foreground mb-3">
            Link Parent & Wrestler
          </Text>
          <View className="space-y-3">
            <Input
              placeholder="Enter email address"
              value={inviteEmail}
              onChangeText={setInviteEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Button
              onPress={handleSendInvite}
              disabled={!inviteEmail.trim() || isInviting}
              className="bg-primary"
            >
              <Text className="text-primary-foreground font-medium">
                {isInviting ? "Sending..." : "Send Invite"}
              </Text>
            </Button>
          </View>
        </Card>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "current" | "pending")
          }
          className="flex-1"
        >
          <Tabs.List className="mb-4">
            <Tabs.Trigger value="current" className="flex-1">
              <Text className="text-sm font-medium">Current Links</Text>
            </Tabs.Trigger>
            <Tabs.Trigger value="pending" className="flex-1">
              <Text className="text-sm font-medium">Pending Invites</Text>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="current" className="flex-1">
            {renderCurrentRelationships()}
          </Tabs.Content>

          <Tabs.Content value="pending" className="flex-1">
            {renderPendingRelationships()}
          </Tabs.Content>
        </Tabs>
      </View>
    </View>
  );
}
