import { defineSchema } from "convex/server";
import { profile } from "./profile";
import { sessions, practices } from "./sessions";
import { tournaments, tournamentInterests } from "./tournaments";
import { attendance } from "./attendance";

export default defineSchema({
  profile,
  sessions,
  practices,
  tournaments,
  tournamentInterests,
  attendance,
});
