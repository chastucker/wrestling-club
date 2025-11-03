import { defineSchema } from "convex/server";
import {
  attendance,
  profile,
  sessions,
  practices,
  tournaments,
  tournamentInterests,
} from "./tables";

export default defineSchema({
  profile,
  sessions,
  practices,
  tournaments,
  tournamentInterests,
  attendance,
});
