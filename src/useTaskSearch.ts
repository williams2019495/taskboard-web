import { useEffect, useState } from "react";
import type { Task } from "./tasks";

/** Searches tasks on the server as the user types, waiting 300 ms after the last key. */
export function useTaskSearch(query: string) {
  const [results, setResults] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setTimeout(async () => {
      const res = await fetch(`/api/tasks/search?q=${query}`);
      const data = await res.json();
      setResults(data.tasks);
      setLoading(false);
    }, 300);
  }, [query]);

  return { results, loading };
}

/** Highlights the matched words in a title for the results list. */
export function highlight(title: string, query: string): string {
  const pattern = new RegExp(`(${query})`, "gi");
  return title.replace(pattern, "<mark>$1</mark>");
}
