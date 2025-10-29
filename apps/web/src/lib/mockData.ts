import {
  User,
  Session,
  Practice,
  Tournament,
  WeightClass,
  Enrollment,
  Attendance,
  TournamentInterest,
  Payment,
  Relationship,
  Invite,
  DashboardStats,
} from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "admin@elitewrestling.com",
    name: "John Smith",
    roles: ["admin"],
    currentRole: "admin",
    phone: "+1-555-0101",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "user-2",
    email: "coach@elitewrestling.com",
    name: "Mike Johnson",
    roles: ["coach", "parent"],
    currentRole: "coach",
    phone: "+1-555-0102",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "user-3",
    email: "sarah.wilson@email.com",
    name: "Sarah Wilson",
    roles: ["parent"],
    currentRole: "parent",
    phone: "+1-555-0103",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    id: "user-4",
    email: "jake.wilson@email.com",
    name: "Jake Wilson",
    roles: ["wrestler"],
    currentRole: "wrestler",
    phone: "+1-555-0104",
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
  },
  {
    id: "user-5",
    email: "lisa.brown@email.com",
    name: "Lisa Brown",
    roles: ["parent"],
    currentRole: "parent",
    phone: "+1-555-0105",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "user-6",
    email: "tom.brown@email.com",
    name: "Tom Brown",
    roles: ["wrestler"],
    currentRole: "wrestler",
    phone: "+1-555-0106",
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-06"),
  },
];

// Mock Weight Classes
export const mockWeightClasses: WeightClass[] = [
  {
    id: "wc-1",
    name: "Bantamweight",
    minWeight: 0,
    maxWeight: 55,
    ageGroup: "U12",
  },
  {
    id: "wc-2",
    name: "Featherweight",
    minWeight: 55,
    maxWeight: 65,
    ageGroup: "U14",
  },
  {
    id: "wc-3",
    name: "Lightweight",
    minWeight: 65,
    maxWeight: 75,
    ageGroup: "U16",
  },
  {
    id: "wc-4",
    name: "Welterweight",
    minWeight: 75,
    maxWeight: 85,
    ageGroup: "U18",
  },
  {
    id: "wc-5",
    name: "Middleweight",
    minWeight: 85,
    maxWeight: 95,
    ageGroup: "U20",
  },
  {
    id: "wc-6",
    name: "Heavyweight",
    minWeight: 95,
    maxWeight: 120,
    ageGroup: "Open",
  },
];

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: "session-1",
    name: "Spring Training 2024",
    description: "Intensive spring training program for all skill levels",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-05-31"),
    repeatPattern: "weekly",
    pricePerSession: 150,
    pricePerPractice: 25,
    maxEnrollments: 30,
    isActive: true,
    practices: [],
    enrollments: [],
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "session-2",
    name: "Summer Intensive",
    description: "High-intensity summer program for competitive wrestlers",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    repeatPattern: "weekly",
    pricePerSession: 200,
    pricePerPractice: 35,
    maxEnrollments: 25,
    isActive: true,
    practices: [],
    enrollments: [],
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    id: "session-3",
    name: "Fall Fundamentals",
    description: "Back to basics program focusing on fundamental techniques",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-11-30"),
    repeatPattern: "weekly",
    pricePerSession: 120,
    pricePerPractice: 20,
    maxEnrollments: 35,
    isActive: false,
    practices: [],
    enrollments: [],
    createdAt: new Date("2024-02-25"),
    updatedAt: new Date("2024-02-25"),
  },
];

// Mock Practices
export const mockPractices: Practice[] = [
  {
    id: "practice-1",
    sessionId: "session-1",
    name: "Monday Technique Practice",
    description: "Focus on takedown techniques",
    date: new Date("2024-03-04"),
    startTime: "18:00",
    endTime: "20:00",
    location: "Main Gym",
    maxCapacity: 20,
    isActive: true,
    attendance: [],
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "practice-2",
    sessionId: "session-1",
    name: "Wednesday Conditioning",
    description: "High-intensity conditioning and drills",
    date: new Date("2024-03-06"),
    startTime: "18:00",
    endTime: "20:00",
    location: "Main Gym",
    maxCapacity: 20,
    isActive: true,
    attendance: [],
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "practice-3",
    sessionId: "session-1",
    name: "Friday Live Wrestling",
    description: "Live wrestling and competition prep",
    date: new Date("2024-03-08"),
    startTime: "18:00",
    endTime: "20:00",
    location: "Main Gym",
    maxCapacity: 20,
    isActive: true,
    attendance: [],
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
];

// Mock Tournaments
export const mockTournaments: Tournament[] = [
  {
    id: "tournament-1",
    name: "Spring State Championships",
    description: "Annual state championship tournament",
    date: new Date("2024-04-15"),
    location: "State Convention Center",
    weightClasses: mockWeightClasses,
    maxParticipants: 200,
    entryFee: 50,
    isActive: true,
    interests: [],
    teams: [],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "tournament-2",
    name: "Summer Invitational",
    description: "Invitational tournament for advanced wrestlers",
    date: new Date("2024-07-20"),
    location: "Elite Wrestling Academy",
    weightClasses: mockWeightClasses.slice(2), // Only U16 and up
    maxParticipants: 100,
    entryFee: 75,
    isActive: true,
    interests: [],
    teams: [],
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
];

// Mock Enrollments
export const mockEnrollments: Enrollment[] = [
  {
    id: "enrollment-1",
    userId: "user-3",
    sessionId: "session-1",
    enrollmentType: "per-session",
    status: "confirmed",
    enrolledAt: new Date("2024-02-20"),
    paymentStatus: "paid",
    paymentAmount: 150,
    paymentDate: new Date("2024-02-20"),
  },
  {
    id: "enrollment-2",
    userId: "user-4",
    sessionId: "session-1",
    enrollmentType: "per-practice",
    status: "confirmed",
    enrolledAt: new Date("2024-02-22"),
    paymentStatus: "paid",
    paymentAmount: 25,
    paymentDate: new Date("2024-02-22"),
  },
  {
    id: "enrollment-3",
    userId: "user-5",
    sessionId: "session-2",
    enrollmentType: "per-session",
    status: "pending",
    enrolledAt: new Date("2024-02-25"),
    paymentStatus: "pending",
    paymentAmount: 200,
  },
];

// Mock Attendance
export const mockAttendance: Attendance[] = [
  {
    id: "attendance-1",
    userId: "user-4",
    practiceId: "practice-1",
    status: "present",
    checkedInAt: new Date("2024-03-04T18:05:00"),
  },
  {
    id: "attendance-2",
    userId: "user-6",
    practiceId: "practice-1",
    status: "late",
    checkedInAt: new Date("2024-03-04T18:15:00"),
  },
];

// Mock Tournament Interests
export const mockTournamentInterests: TournamentInterest[] = [
  {
    id: "interest-1",
    userId: "user-4",
    tournamentId: "tournament-1",
    weightClass: "wc-2",
    notes: "First tournament, excited!",
    status: "interested",
    submittedAt: new Date("2024-02-28"),
  },
  {
    id: "interest-2",
    userId: "user-6",
    tournamentId: "tournament-1",
    weightClass: "wc-3",
    status: "confirmed",
    submittedAt: new Date("2024-02-25"),
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: "payment-1",
    userId: "user-3",
    amount: 150,
    currency: "USD",
    status: "completed",
    type: "session",
    referenceId: "session-1",
    stripePaymentIntentId: "pi_1234567890",
    createdAt: new Date("2024-02-20"),
    completedAt: new Date("2024-02-20"),
  },
  {
    id: "payment-2",
    userId: "user-4",
    amount: 25,
    currency: "USD",
    status: "completed",
    type: "practice",
    referenceId: "practice-1",
    stripePaymentIntentId: "pi_0987654321",
    createdAt: new Date("2024-02-22"),
    completedAt: new Date("2024-02-22"),
  },
  {
    id: "payment-3",
    userId: "user-5",
    amount: 200,
    currency: "USD",
    status: "pending",
    type: "session",
    referenceId: "session-2",
    createdAt: new Date("2024-02-25"),
  },
];

// Mock Relationships
export const mockRelationships: Relationship[] = [
  {
    id: "relationship-1",
    parentId: "user-3",
    wrestlerId: "user-4",
    status: "confirmed",
    invitedAt: new Date("2024-01-10"),
    confirmedAt: new Date("2024-01-12"),
  },
  {
    id: "relationship-2",
    parentId: "user-5",
    wrestlerId: "user-6",
    status: "confirmed",
    invitedAt: new Date("2024-01-15"),
    confirmedAt: new Date("2024-01-17"),
  },
];

// Mock Invites
export const mockInvites: Invite[] = [
  {
    id: "invite-1",
    fromUserId: "user-2",
    toEmail: "newparent@email.com",
    type: "parent",
    status: "pending",
    token: "invite_token_123",
    expiresAt: new Date("2024-03-15"),
    createdAt: new Date("2024-02-28"),
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: Record<string, DashboardStats> = {
  "user-1": {
    // Admin
    totalPractices: 12,
    checkedInToday: 8,
    unpaidCount: 3,
    upcomingTournaments: 2,
    mySessions: 0,
    myEnrollments: 0,
  },
  "user-2": {
    // Coach
    totalPractices: 12,
    checkedInToday: 8,
    unpaidCount: 0,
    upcomingTournaments: 2,
    mySessions: 0,
    myEnrollments: 0,
  },
  "user-3": {
    // Parent
    totalPractices: 0,
    checkedInToday: 0,
    unpaidCount: 0,
    upcomingTournaments: 1,
    mySessions: 1,
    myEnrollments: 1,
  },
  "user-4": {
    // Wrestler
    totalPractices: 3,
    checkedInToday: 1,
    unpaidCount: 0,
    upcomingTournaments: 1,
    mySessions: 1,
    myEnrollments: 1,
  },
  "user-5": {
    // Parent
    totalPractices: 0,
    checkedInToday: 0,
    unpaidCount: 1,
    upcomingTournaments: 1,
    mySessions: 1,
    myEnrollments: 1,
  },
  "user-6": {
    // Wrestler
    totalPractices: 3,
    checkedInToday: 1,
    unpaidCount: 0,
    upcomingTournaments: 1,
    mySessions: 1,
    myEnrollments: 1,
  },
};

// Helper functions to get data by user/role
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

export const getSessionsByUser = (userId: string): Session[] => {
  const user = getUserById(userId);
  if (!user) return [];

  if (user.roles.includes("admin")) {
    return mockSessions;
  }

  // For parents/wrestlers, return sessions they're enrolled in
  const userEnrollments = mockEnrollments.filter((e) => e.userId === userId);
  return mockSessions.filter((session) =>
    userEnrollments.some((enrollment) => enrollment.sessionId === session.id),
  );
};

export const getPracticesByUser = (userId: string): Practice[] => {
  const user = getUserById(userId);
  if (!user) return [];

  if (user.roles.includes("admin") || user.roles.includes("coach")) {
    return mockPractices;
  }

  // For parents/wrestlers, return practices from their enrolled sessions
  const userSessions = getSessionsByUser(userId);
  return mockPractices.filter((practice) =>
    userSessions.some((session) => session.id === practice.sessionId),
  );
};

export const getTournamentsByUser = (userId: string): Tournament[] => {
  const user = getUserById(userId);
  if (!user) return [];

  if (user.roles.includes("admin") || user.roles.includes("coach")) {
    return mockTournaments;
  }

  // For parents/wrestlers, return tournaments they're interested in
  const userInterests = mockTournamentInterests.filter(
    (interest) => interest.userId === userId,
  );
  return mockTournaments.filter((tournament) =>
    userInterests.some((interest) => interest.tournamentId === tournament.id),
  );
};

export const getPaymentsByUser = (userId: string): Payment[] => {
  return mockPayments.filter((payment) => payment.userId === userId);
};

export const getRelationshipsByUser = (userId: string): Relationship[] => {
  return mockRelationships.filter(
    (rel) => rel.parentId === userId || rel.wrestlerId === userId,
  );
};
