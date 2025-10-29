import { DateTime } from "luxon";

// Types
export type UserRole = "admin" | "coach" | "parent" | "wrestler";

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  activeRole: UserRole;
  phone?: string;
  avatar?: string;
}

export interface Session {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  repeatPattern: "weekly" | "biweekly";
  pricePerSession: number;
  pricePerPractice: number;
  practices: Practice[];
  enrolledUserIds: string[];
  description?: string;
}

export interface Practice {
  id: string;
  sessionId: string;
  date: string;
  time: string;
  location: string;
  checkIns: string[]; // user IDs
  coachId?: string;
  notes?: string;
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  weightClasses: string[];
  interests: TournamentInterest[];
  description?: string;
  registrationDeadline: string;
  entryFee: number;
}

export interface TournamentInterest {
  userId: string;
  weightClass: string;
  notes?: string;
  status: "interested" | "accepted" | "declined";
  submittedAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  sessionId?: string;
  practiceId?: string;
  amount: number;
  status: "paid" | "unpaid";
  date: string;
  description: string;
  paymentMethod?: string;
}

export interface Relationship {
  id: string;
  parentId: string;
  wrestlerId: string;
  status: "active" | "pending";
  createdAt: string;
  invitedBy: string;
}

// Mock data
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john@example.com",
    roles: ["parent"],
    activeRole: "parent",
    phone: "+1-555-0123",
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    roles: ["wrestler"],
    activeRole: "wrestler",
    phone: "+1-555-0124",
  },
  {
    id: "user-3",
    name: "Mike Wilson",
    email: "mike@example.com",
    roles: ["coach", "parent"],
    activeRole: "coach",
    phone: "+1-555-0125",
  },
  {
    id: "user-4",
    name: "Lisa Brown",
    email: "lisa@example.com",
    roles: ["admin"],
    activeRole: "admin",
    phone: "+1-555-0126",
  },
  {
    id: "user-5",
    name: "Tom Davis",
    email: "tom@example.com",
    roles: ["wrestler"],
    activeRole: "wrestler",
    phone: "+1-555-0127",
  },
];

export const mockSessions: Session[] = [
  {
    id: "session-1",
    name: "Elite Wrestling Fundamentals",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    repeatPattern: "weekly",
    pricePerSession: 120,
    pricePerPractice: 25,
    enrolledUserIds: ["user-1", "user-2", "user-5"],
    description:
      "Learn the fundamentals of wrestling with our experienced coaches.",
    practices: [
      {
        id: "practice-1",
        sessionId: "session-1",
        date: "2024-01-15",
        time: "18:00",
        location: "Main Gym",
        checkIns: ["user-2"],
        coachId: "user-3",
        notes: "Focus on stance and movement",
      },
      {
        id: "practice-2",
        sessionId: "session-1",
        date: "2024-01-22",
        time: "18:00",
        location: "Main Gym",
        checkIns: [],
        coachId: "user-3",
        notes: "Takedown techniques",
      },
      {
        id: "practice-3",
        sessionId: "session-1",
        date: "2024-01-29",
        time: "18:00",
        location: "Main Gym",
        checkIns: ["user-2", "user-5"],
        coachId: "user-3",
        notes: "Defense and escapes",
      },
    ],
  },
  {
    id: "session-2",
    name: "Advanced Competition Prep",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    repeatPattern: "biweekly",
    pricePerSession: 200,
    pricePerPractice: 40,
    enrolledUserIds: ["user-2"],
    description: "Advanced techniques for competitive wrestlers.",
    practices: [
      {
        id: "practice-4",
        sessionId: "session-2",
        date: "2024-02-01",
        time: "19:00",
        location: "Competition Gym",
        checkIns: ["user-2"],
        coachId: "user-3",
        notes: "Advanced takedowns",
      },
    ],
  },
];

export const mockTournaments: Tournament[] = [
  {
    id: "tournament-1",
    name: "Spring Championship",
    date: "2024-03-15",
    location: "State Fairgrounds",
    weightClasses: [
      "106",
      "113",
      "120",
      "126",
      "132",
      "138",
      "145",
      "152",
      "160",
      "170",
      "182",
      "195",
      "220",
      "285",
    ],
    interests: [
      {
        userId: "user-2",
        weightClass: "120",
        notes: "First tournament, excited!",
        status: "interested",
        submittedAt: "2024-01-10T10:00:00Z",
      },
      {
        userId: "user-5",
        weightClass: "132",
        notes: "Ready to compete",
        status: "accepted",
        submittedAt: "2024-01-12T14:30:00Z",
      },
    ],
    description: "Annual spring wrestling championship for all weight classes.",
    registrationDeadline: "2024-03-01",
    entryFee: 50,
  },
  {
    id: "tournament-2",
    name: "Summer Invitational",
    date: "2024-06-20",
    location: "Community Center",
    weightClasses: [
      "106",
      "113",
      "120",
      "126",
      "132",
      "138",
      "145",
      "152",
      "160",
      "170",
      "182",
      "195",
      "220",
      "285",
    ],
    interests: [],
    description: "Invitational tournament for advanced wrestlers.",
    registrationDeadline: "2024-06-01",
    entryFee: 75,
  },
];

export const mockPayments: Payment[] = [
  {
    id: "payment-1",
    userId: "user-1",
    sessionId: "session-1",
    amount: 120,
    status: "paid",
    date: "2024-01-10",
    description: "Elite Wrestling Fundamentals - Full Session",
    paymentMethod: "Credit Card",
  },
  {
    id: "payment-2",
    userId: "user-2",
    sessionId: "session-1",
    amount: 120,
    status: "paid",
    date: "2024-01-12",
    description: "Elite Wrestling Fundamentals - Full Session",
    paymentMethod: "Credit Card",
  },
  {
    id: "payment-3",
    userId: "user-2",
    practiceId: "practice-1",
    amount: 25,
    status: "unpaid",
    date: "2024-01-15",
    description: "Elite Wrestling Fundamentals - Single Practice",
  },
  {
    id: "payment-4",
    userId: "user-5",
    sessionId: "session-1",
    amount: 120,
    status: "unpaid",
    date: "2024-01-20",
    description: "Elite Wrestling Fundamentals - Full Session",
  },
];

export const mockRelationships: Relationship[] = [
  {
    id: "rel-1",
    parentId: "user-1",
    wrestlerId: "user-2",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    invitedBy: "user-1",
  },
  {
    id: "rel-2",
    parentId: "user-3",
    wrestlerId: "user-5",
    status: "pending",
    createdAt: "2024-01-15T10:00:00Z",
    invitedBy: "user-3",
  },
];

// Helper functions
export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}

export function getSessionById(id: string): Session | undefined {
  return mockSessions.find((session) => session.id === id);
}

export function getTournamentById(id: string): Tournament | undefined {
  return mockTournaments.find((tournament) => tournament.id === id);
}

export function getPracticeById(id: string): Practice | undefined {
  return mockSessions
    .flatMap((session) => session.practices)
    .find((practice) => practice.id === id);
}

export function getPaymentsByUserId(userId: string): Payment[] {
  return mockPayments.filter((payment) => payment.userId === userId);
}

export function getRelationshipsByUserId(userId: string): Relationship[] {
  return mockRelationships.filter(
    (rel) => rel.parentId === userId || rel.wrestlerId === userId,
  );
}

export function getUpcomingPractices(): Practice[] {
  const now = DateTime.now();
  return mockSessions
    .flatMap((session) => session.practices)
    .filter((practice) => {
      const practiceDate = DateTime.fromISO(practice.date);
      return practiceDate > now;
    })
    .sort(
      (a, b) =>
        DateTime.fromISO(a.date).toMillis() -
        DateTime.fromISO(b.date).toMillis(),
    );
}

export function getUpcomingTournaments(): Tournament[] {
  const now = DateTime.now();
  return mockTournaments
    .filter((tournament) => {
      const tournamentDate = DateTime.fromISO(tournament.date);
      return tournamentDate > now;
    })
    .sort(
      (a, b) =>
        DateTime.fromISO(a.date).toMillis() -
        DateTime.fromISO(b.date).toMillis(),
    );
}
