import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createProfile = mutation({
  args: {
    role: v.union(
      v.literal("pending_coach"),
      v.literal("wrestler"),
      v.literal("parent"),
    ),
    clubId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    city: v.string(),
    state: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      throw new Error("User not found");
    }

    const existingProfile = await ctx.db
      .query("profile")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    if (existingProfile) {
      throw new Error("Profile already exists");
    }

    return await ctx.db.insert("profile", {
      userId,
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getProfile = query({
  args: {
    clubId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      throw new Error("User not found");
    }

    return await ctx.db
      .query("profile")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("clubId"), args.clubId),
        ),
      )
      .collect();
  },
});
