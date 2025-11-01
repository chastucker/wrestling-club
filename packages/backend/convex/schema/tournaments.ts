import { defineTable } from "convex/server";
import { v } from "convex/values";

export const tournaments = defineTable({
  _id: v.id("tournament"),
  clubId: v.string(),
  name: v.string(),
  description: v.string(),
  startDate: v.number(),
  endDate: v.number(),
  location: v.string(),
  tournamentUrl: v.string(),
  type: v.union(v.literal("dual"), v.literal("individual")),
  createdAt: v.number(),
  updatedAt: v.number(),
}).index("by_club_id", ["clubId"]);


export const tournamentInterests = defineTable({
  _id: v.id("tournament_interest"),
  tournamentId: v.id("tournament"),
  weightClass: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
}).index("by_tournament_id", ["tournamentId"]);