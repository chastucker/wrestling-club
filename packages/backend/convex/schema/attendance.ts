import { defineTable } from "convex/server";
import { v } from "convex/values";

export const attendance = defineTable({
  _id: v.id("attendance"),
  userId: v.string(),
  practiceId: v.id("practice"),
  clubId: v.string(),
  checkedInAt: v.number(),
  notes: v.optional(v.string()),

  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_user_id", ["userId"])
  .index("by_practice_id", ["practiceId"])
  .index("by_club_id", ["clubId"]);
