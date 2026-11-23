import type { Status } from "./tasks";

const MESSAGES: Record<Status, string> = {
  todo: "Nothing to do yet. Add a task to get started.",
  doing: "No work in progress.",
  done: "Finished tasks will show up here.",
};

/** Shown in a column that has no tasks. */
export function EmptyColumn({ status }: { status: Status }) {
  return (
    <p role="status" style={{ color: "#6b7280", fontStyle: "italic" }}>
      {MESSAGES[status]}
    </p>
  );
}
