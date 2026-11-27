import groupBy from "lodash/groupBy";

export type Status = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
  assignee?: string;
  dueDate?: string; // YYYY-MM-DD
}

export const COLUMNS: Status[] = ["todo", "doing", "done"];

/** Tasks per column, each column sorted by due date with undated tasks last. */
export function board(tasks: Task[]): Record<Status, Task[]> {
  const grouped = groupBy(tasks, (t) => t.status);
  const result = {} as Record<Status, Task[]>;
  for (const column of COLUMNS) {
    result[column] = [...(grouped[column] ?? [])].sort(byDueDate);
  }
  return result;
}

function byDueDate(a: Task, b: Task): number {
  if (!a.dueDate) return b.dueDate ? 1 : 0;
  if (!b.dueDate) return -1;
  return a.dueDate.localeCompare(b.dueDate);
}

/** Moves a task to another column, returning a new list. */
export function move(tasks: Task[], id: string, to: Status): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: to } : t));
}

/** Tasks past their due date that are not done, as of `today` (YYYY-MM-DD). */
export function overdue(tasks: Task[], today: string): Task[] {
  return tasks.filter((t) => t.status !== "done" && !!t.dueDate && t.dueDate < today);
}

/** The date `days` days after `date` (both YYYY-MM-DD). */
export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Tasks not done that are due today or within the next `days` days, soonest first. */
export function dueSoon(tasks: Task[], today: string, days: number): Task[] {
  const until = addDays(today, days);
  return tasks.filter((t) => t.status !== "done" && !!t.dueDate && t.dueDate >= today && t.dueDate <= until).sort(byDueDate);
}
