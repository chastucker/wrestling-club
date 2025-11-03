/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as profile from "../profile.js";
import type * as schema_attendance from "../schema/attendance.js";
import type * as schema_profile from "../schema/profile.js";
import type * as schema_sessions from "../schema/sessions.js";
import type * as schema_tournaments from "../schema/tournaments.js";
import type * as tables_attendance from "../tables/attendance.js";
import type * as tables_index from "../tables/index.js";
import type * as tables_profile from "../tables/profile.js";
import type * as tables_sessions from "../tables/sessions.js";
import type * as tables_tournaments from "../tables/tournaments.js";
import type * as utils from "../utils.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  profile: typeof profile;
  "schema/attendance": typeof schema_attendance;
  "schema/profile": typeof schema_profile;
  "schema/sessions": typeof schema_sessions;
  "schema/tournaments": typeof schema_tournaments;
  "tables/attendance": typeof tables_attendance;
  "tables/index": typeof tables_index;
  "tables/profile": typeof tables_profile;
  "tables/sessions": typeof tables_sessions;
  "tables/tournaments": typeof tables_tournaments;
  utils: typeof utils;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
