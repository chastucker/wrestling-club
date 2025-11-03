import { defineTable } from "convex/server";
import { v } from "convex/values";

export const profile = defineTable({
  userId: v.string(),
  role: v.union(
    v.literal("admin"),
    v.literal("coach"),
    v.literal("pending_coach"),
    v.literal("wrestler"),
    v.literal("parent"),
  ),
  firstName: v.string(),
  lastName: v.string(),
  city: v.string(),
  state: v.string(),
  clubId: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_user_id", ["userId"])
  .index("by_club_id", ["clubId"]);
