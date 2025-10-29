"use client";

import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { StatTile } from "@/components/shared/StatTile";
import {
  mockPayments,
  mockUsers,
  mockSessions,
  mockPractices,
  mockTournaments,
} from "@/lib/mockData";
import { CreditCard, DollarSign, Filter } from "lucide-react";

export default function PaymentsPage() {
  const { user } = useUserRole();
  const { canViewPayments, canViewAllPayments } = useRoleAccess();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

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

  if (!canViewPayments()) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to view payments.
          </p>
        </div>
      </div>
    );
  }

  // Get payments based on user role
  const userPayments = canViewAllPayments()
    ? mockPayments
    : mockPayments.filter((payment) => payment.userId === user.id);

  // Filter payments
  const filteredPayments = userPayments.filter((payment) => {
    const matchesSearch = (() => {
      const user = mockUsers.find((u) => u.id === payment.userId);
      const userName = user ? user.name : "Unknown User";

      // Get reference name
      let referenceName = "";
      if (payment.type === "session") {
        const session = mockSessions.find((s) => s.id === payment.referenceId);
        referenceName = session ? session.name : payment.referenceId;
      } else if (payment.type === "practice") {
        const practice = mockPractices.find(
          (p) => p.id === payment.referenceId,
        );
        referenceName = practice ? practice.name : payment.referenceId;
      } else if (payment.type === "tournament") {
        const tournament = mockTournaments.find(
          (t) => t.id === payment.referenceId,
        );
        referenceName = tournament ? tournament.name : payment.referenceId;
      }

      return (
        userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referenceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })();

    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesType = typeFilter === "all" || payment.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats
  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  const completedPayments = filteredPayments.filter(
    (p) => p.status === "completed",
  );
  const pendingPayments = filteredPayments.filter(
    (p) => p.status === "pending",
  );
  const failedPayments = filteredPayments.filter((p) => p.status === "failed");

  const getReferenceName = (payment: any) => {
    if (payment.type === "session") {
      const session = mockSessions.find((s) => s.id === payment.referenceId);
      return session ? session.name : payment.referenceId;
    } else if (payment.type === "practice") {
      const practice = mockPractices.find((p) => p.id === payment.referenceId);
      return practice ? practice.name : payment.referenceId;
    } else if (payment.type === "tournament") {
      const tournament = mockTournaments.find(
        (t) => t.id === payment.referenceId,
      );
      return tournament ? tournament.name : payment.referenceId;
    }
    return payment.referenceId;
  };

  const columns = [
    {
      key: "id",
      label: "Payment ID",
      render: (payment: any) => (
        <span className="font-mono text-sm">{payment.id.slice(-8)}</span>
      ),
    },
    ...(canViewAllPayments()
      ? [
          {
            key: "user",
            label: "Member",
            render: (payment: any) => {
              const user = mockUsers.find((u) => u.id === payment.userId);
              return user ? user.name : "Unknown User";
            },
          },
        ]
      : []),
    {
      key: "reference",
      label: "Item",
      render: (payment: any) => getReferenceName(payment),
    },
    {
      key: "type",
      label: "Type",
      render: (payment: any) => (
        <span className="capitalize">{payment.type}</span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (payment: any) => (
        <span className="font-semibold">${payment.amount.toFixed(2)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (payment: any) => (
        <StatusBadge status={payment.status} size="sm" />
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (payment: any) =>
        new Date(payment.createdAt).toLocaleDateString(),
    },
    {
      key: "completedAt",
      label: "Completed",
      render: (payment: any) =>
        payment.completedAt
          ? new Date(payment.completedAt).toLocaleDateString()
          : "-",
    },
  ];

  const handleExport = () => {
    // In a real app, this would generate and download a CSV
    console.log("Exporting payments data...");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-1">
          {canViewAllPayments()
            ? "View all payment transactions"
            : "View your payment history"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatTile
          title="Total Amount"
          value={`$${totalAmount.toFixed(2)}`}
          description="All payments"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatTile
          title="Completed"
          value={completedPayments.length}
          description="Successful payments"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatTile
          title="Pending"
          value={pendingPayments.length}
          description="Awaiting payment"
          icon={<Filter className="h-4 w-4" />}
        />
        <StatTile
          title="Failed"
          value={failedPayments.length}
          description="Failed payments"
          icon={<CreditCard className="h-4 w-4" />}
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <DataTable
            data={filteredPayments}
            columns={columns}
            searchable={true}
            filterable={true}
            exportable={true}
            onSearch={setSearchQuery}
            onFilter={(filter) => {
              if (filter === "all") setStatusFilter("all");
              else if (
                ["completed", "pending", "failed", "refunded"].includes(filter)
              )
                setStatusFilter(filter);
              else if (["session", "practice", "tournament"].includes(filter))
                setTypeFilter(filter);
            }}
            onExport={handleExport}
            emptyMessage="No payments found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
