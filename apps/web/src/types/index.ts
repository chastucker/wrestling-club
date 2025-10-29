export type UserRole = "admin" | "coach" | "parent" | "wrestler";

export type User = {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  currentRole: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Session = {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  repeatPattern: "weekly" | "biweekly" | "monthly" | "none";
  pricePerSession: number;
  pricePerPractice: number;
  maxEnrollments?: number;
  isActive: boolean;
  practices: Practice[];
  enrollments: Enrollment[];
  createdAt: Date;
  updatedAt: Date;
};

export type Practice = {
  id: string;
  sessionId: string;
  name: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  maxCapacity?: number;
  isActive: boolean;
  attendance: Attendance[];
  createdAt: Date;
  updatedAt: Date;
};

export type Tournament = {
  id: string;
  name: string;
  description?: string;
  date: Date;
  location: string;
  weightClasses: WeightClass[];
  maxParticipants?: number;
  entryFee?: number;
  isActive: boolean;
  interests: TournamentInterest[];
  teams: Team[];
  createdAt: Date;
  updatedAt: Date;
};

export type WeightClass = {
  id: string;
  name: string;
  minWeight: number;
  maxWeight: number;
  ageGroup: string;
};

export type Team = {
  id: string;
  tournamentId: string;
  name: string;
  members: string[]; // User IDs
  weightClass: string;
  isAccepted: boolean;
  createdAt: Date;
};

export type Enrollment = {
  id: string;
  userId: string;
  sessionId: string;
  enrollmentType: "per-session" | "per-practice";
  status: "pending" | "confirmed" | "cancelled";
  enrolledAt: Date;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentAmount: number;
  paymentDate?: Date;
};

export type Attendance = {
  id: string;
  userId: string;
  practiceId: string;
  status: "present" | "absent" | "late" | "excused";
  checkedInAt?: Date;
  notes?: string;
};

export type TournamentInterest = {
  id: string;
  userId: string;
  tournamentId: string;
  weightClass: string;
  notes?: string;
  status: "interested" | "confirmed" | "declined";
  submittedAt: Date;
};

export type Payment = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  type: "session" | "practice" | "tournament";
  referenceId: string; // ID of session, practice, or tournament
  stripePaymentIntentId?: string;
  createdAt: Date;
  completedAt?: Date;
};

export type Relationship = {
  id: string;
  parentId: string;
  wrestlerId: string;
  status: "pending" | "confirmed" | "declined";
  invitedAt: Date;
  confirmedAt?: Date;
  notes?: string;
};

export type Invite = {
  id: string;
  fromUserId: string;
  toEmail: string;
  toPhone?: string;
  type: "parent" | "wrestler";
  status: "pending" | "accepted" | "declined" | "expired";
  token: string;
  expiresAt: Date;
  createdAt: Date;
};

// Navigation types
export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  icon?: string;
  roles: UserRole[];
  children?: NavigationItem[];
};

// Dashboard stats
export type DashboardStats = {
  totalPractices: number;
  checkedInToday: number;
  unpaidCount: number;
  upcomingTournaments: number;
  mySessions: number;
  myEnrollments: number;
};

// Form types
export type SignUpForm = {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
};

export type SignInForm = {
  email: string;
  password: string;
};

export type SessionForm = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  repeatPattern: "weekly" | "biweekly" | "monthly" | "none";
  pricePerSession: number;
  pricePerPractice: number;
  maxEnrollments?: number;
};

export type TournamentForm = {
  name: string;
  description?: string;
  date: Date;
  location: string;
  weightClasses: WeightClass[];
  maxParticipants?: number;
  entryFee?: number;
};

export type WeightClassForm = {
  name: string;
  minWeight: number;
  maxWeight: number;
  ageGroup: string;
};

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};
