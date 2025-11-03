import { defineTable } from "convex/server";
import { v } from "convex/values";

export const attendance = defineTable({
  userId: v.string(),
  practiceId: v.id("practices"),
  clubId: v.string(),
  checkedInAt: v.number(),
  notes: v.optional(v.string()),

  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_user_id", ["userId"])
  .index("by_practice_id", ["practiceId"])
  .index("by_club_id", ["clubId"]);
