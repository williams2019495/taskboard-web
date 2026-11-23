import { useState } from "react";
import { EmptyColumn } from "./EmptyColumn";
import { board, COLUMNS, move, type Status, type Task } from "./tasks";

const START: Task[] = [
  { id: "1", title: "Write release notes", status: "todo", dueDate: "2026-12-03" },
  { id: "2", title: "Fix login redirect", status: "doing", assignee: "Sophie" },
  { id: "3", title: "Ship invoices page", status: "done" },
];

const LABELS: Record<Status, string> = { todo: "To do", doing: "In progress", done: "Done" };

export function App() {
  const [tasks, setTasks] = useState(START);
  const columns = board(tasks);
  return (
    <main style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, padding: 24 }}>
      {COLUMNS.map((column) => (
        <section key={column}>
          <h2>{LABELS[column]}</h2>
          {columns[column].length === 0 && <EmptyColumn status={column} />}
          {columns[column].map((task) => (
            <article key={task.id}>
              <strong>{task.title}</strong>
              {task.assignee && <p>{task.assignee}</p>}
              {column !== "done" && (
                <button onClick={() => setTasks(move(tasks, task.id, column === "todo" ? "doing" : "done"))}>
                  Move on
                </button>
              )}
            </article>
          ))}
        </section>
      ))}
    </main>
  );
}
