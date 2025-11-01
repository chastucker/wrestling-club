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
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("profile", {
      userId,
      role: args.role,
      clubId: args.clubId,
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
