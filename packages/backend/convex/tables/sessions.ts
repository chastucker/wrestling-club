import { defineTable } from "convex/server";
import { v } from "convex/values";

export const sessions = defineTable({
  clubId: v.string(),
  name: v.string(),
  description: v.string(),
  startDate: v.number(),
  endDate: v.number(),
  repeatPattern: v.union(
    v.literal("weekly"),
    v.literal("biweekly"),
    v.literal("monthly"),
    v.literal("none"),
  ),
  pricePerSession: v.number(),
  pricePerPractice: v.number(),
  maxEnrollments: v.number(),
  createdBy: v.string(),
  updatedBy: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
}).index("by_club_id", ["clubId"]);

export const practices = defineTable({
  sessionId: v.id("sessions"),
  clubId: v.string(),
  name: v.string(),
  description: v.string(),
  date: v.number(),
  startTime: v.number(),
  endTime: v.number(),
  location: v.string(),
  maxCapacity: v.number(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_session_id", ["sessionId"])
  .index("by_club_id", ["clubId"]);
