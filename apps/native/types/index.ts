// Re-export all types from mockData for convenience
export type {
  User,
  UserRole,
  Session,
  Practice,
  Tournament,
  TournamentInterest,
  Payment,
  Relationship,
} from "../lib/mockData";

// Navigation types
export type RootStackParamList = {
  index: undefined;
  "(auth)": undefined;
  "(app)": undefined;
  modal: undefined;
  "sign-in": undefined;
  "sign-up": undefined;
  dashboard: undefined;
};

export type AuthStackParamList = {
  "sign-in": undefined;
  "sign-up": undefined;
};

export type AppStackParamList = {
  "(tabs)": undefined;
  "sessions/[id]": { id: string };
  "sessions/[id]/enroll": { id: string };
  "tournaments/[id]": { id: string };
  "tournaments/[id]/interest": { id: string };
  "tournaments/[id]/manage": { id: string };
  "relationships/index": undefined;
  "check-in/index": undefined;
  "payments/index": undefined;
  "events/index": undefined;
  "events/[id]/roster": { id: string };
  "admin/sessions": undefined;
  "admin/tournaments": undefined;
  "admin/members": undefined;
  "admin/payments": undefined;
};

export type TabParamList = {
  index: undefined;
  schedule: undefined;
  sessions: undefined;
  tournaments: undefined;
  more: undefined;
};

// Form types
export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone?: string;
}

export interface EnrollForm {
  enrollmentType: "session" | "practice";
  practiceId?: string;
}

export interface TournamentInterestForm {
  weightClass: string;
  notes?: string;
}

export interface RelationshipInviteForm {
  email: string;
  message?: string;
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface FilterState {
  status?: "paid" | "unpaid";
  dateRange?: {
    start: string;
    end: string;
  };
  searchQuery?: string;
}

// Notification types
export interface NotificationData {
  type: "check-in" | "event" | "payment" | "general";
  title: string;
  body: string;
  data?: Record<string, any>;
}

// Role-based access types
export interface RolePermissions {
  canAccessAdmin: boolean;
  canAccessCoach: boolean;
  canManageSessions: boolean;
  canManageTournaments: boolean;
  canManageMembers: boolean;
  canViewAllPayments: boolean;
  canCheckIn: boolean;
  canEnroll: boolean;
  canShowInterest: boolean;
}
