import { describe, expect, it } from "vitest";
import { board, dueSoon, move, overdue, type Task } from "./tasks";

const tasks: Task[] = [
  { id: "1", title: "Write release notes", status: "todo", dueDate: "2026-12-03" },
  { id: "2", title: "Fix login redirect", status: "doing", dueDate: "2026-11-20" },
  { id: "3", title: "Design empty state", status: "todo" },
  { id: "4", title: "Ship invoices page", status: "done", dueDate: "2026-11-10" },
  { id: "5", title: "Plan Q1 roadmap", status: "todo", dueDate: "2026-11-28" },
];

describe("board", () => {
  it("groups by column and sorts by due date, undated last", () => {
    expect(board(tasks).todo.map((t) => t.id)).toEqual(["5", "1", "3"]);
    expect(board(tasks).done.map((t) => t.id)).toEqual(["4"]);
  });

  it("moves a task without changing the others", () => {
    const moved = move(tasks, "1", "doing");
    expect(moved.find((t) => t.id === "1")!.status).toBe("doing");
    expect(tasks.find((t) => t.id === "1")!.status).toBe("todo");
  });

  it("lists overdue tasks that are not done", () => {
    expect(overdue(tasks, "2026-11-23").map((t) => t.id)).toEqual(["2"]);
  });
});

describe("dueSoon", () => {
  it("lists tasks due in the next few days, soonest first", () => {
    const tasks = [
      { id: "1", title: "Write release notes", status: "todo" as const, dueDate: "2026-11-30" },
      { id: "2", title: "Fix login bug", status: "doing" as const, dueDate: "2026-11-29" },
      { id: "3", title: "Plan Q1", status: "todo" as const, dueDate: "2026-12-20" },
    ];
    expect(dueSoon(tasks, "2026-11-28", 3).map((t) => t.id)).toEqual(["2", "1"]);
  });
});
