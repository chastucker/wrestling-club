import { DateTime } from "luxon";

export function formatDate(date: string | Date): string {
  const dateTime =
    typeof date === "string"
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);
  return dateTime.toFormat("MMM dd, yyyy");
}

export function formatTime(time: string): string {
  const dateTime = DateTime.fromFormat(time, "HH:mm");
  return dateTime.toFormat("h:mm a");
}

export function formatDateTime(date: string, time: string): string {
  const dateTime = DateTime.fromISO(`${date}T${time}`);
  return dateTime.toFormat("MMM dd, yyyy h:mm a");
}

export function isToday(date: string | Date): boolean {
  const dateTime =
    typeof date === "string"
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);
  return dateTime.hasSame(DateTime.now(), "day");
}

export function isTomorrow(date: string | Date): boolean {
  const dateTime =
    typeof date === "string"
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);
  const tomorrow = DateTime.now().plus({ days: 1 });
  return dateTime.hasSame(tomorrow, "day");
}

export function isPast(date: string | Date): boolean {
  const dateTime =
    typeof date === "string"
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);
  return dateTime < DateTime.now();
}

export function isUpcoming(date: string | Date): boolean {
  return !isPast(date);
}

export function getRelativeTime(date: string | Date): string {
  const dateTime =
    typeof date === "string"
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);
  const now = DateTime.now();
  const diff = dateTime.diff(now, ["days", "hours", "minutes"]).toObject();

  if (isToday(date)) {
    return "Today";
  }

  if (isTomorrow(date)) {
    return "Tomorrow";
  }

  if (diff.days && Math.abs(diff.days) >= 1) {
    return `${Math.abs(Math.floor(diff.days))} day${Math.abs(Math.floor(diff.days)) === 1 ? "" : "s"} ${diff.days > 0 ? "from now" : "ago"}`;
  }

  if (diff.hours && Math.abs(diff.hours) >= 1) {
    return `${Math.abs(Math.floor(diff.hours))} hour${Math.abs(Math.floor(diff.hours)) === 1 ? "" : "s"} ${diff.hours > 0 ? "from now" : "ago"}`;
  }

  if (diff.minutes && Math.abs(diff.minutes) >= 1) {
    return `${Math.abs(Math.floor(diff.minutes))} minute${Math.abs(Math.floor(diff.minutes)) === 1 ? "" : "s"} ${diff.minutes > 0 ? "from now" : "ago"}`;
  }

  return "Now";
}

export function groupByDate<T>(
  items: T[],
  dateKey: keyof T,
): Record<string, T[]> {
  const groups: Record<string, T[]> = {};

  items.forEach((item) => {
    const dateValue = item[dateKey];
    if (typeof dateValue === "string") {
      const date = DateTime.fromISO(dateValue).toISODate();
      if (date) {
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
      }
    }
  });

  return groups;
}

export function sortByDate<T>(
  items: T[],
  dateKey: keyof T,
  direction: "asc" | "desc" = "asc",
): T[] {
  return [...items].sort((a, b) => {
    const dateA = DateTime.fromISO(a[dateKey] as string);
    const dateB = DateTime.fromISO(b[dateKey] as string);

    if (direction === "asc") {
      return dateA.toMillis() - dateB.toMillis();
    } else {
      return dateB.toMillis() - dateA.toMillis();
    }
  });
}

export function getDateRange(startDate: string, endDate: string): string {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  if (start.hasSame(end, "year")) {
    if (start.hasSame(end, "month")) {
      return `${start.toFormat("MMM dd")} - ${end.toFormat("dd, yyyy")}`;
    } else {
      return `${start.toFormat("MMM dd")} - ${end.toFormat("MMM dd, yyyy")}`;
    }
  } else {
    return `${start.toFormat("MMM dd, yyyy")} - ${end.toFormat("MMM dd, yyyy")}`;
  }
}
