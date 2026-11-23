import { useEffect, useState } from "react";

export interface Comment {
  id: string;
  author: string;
  body: string; // markdown
  createdAt: string;
}

/** Turns the small markdown subset we support into HTML: **bold**, _italic_, `code` and links. */
export function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, "<br>");
}

export function TaskComments({ taskId }: { taskId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    fetch(`/api/tasks/${taskId}/comments`)
      .then((r) => r.json())
      .then((data) => setComments(data.comments));
  }, []);

  async function post() {
    const res = await fetch(`/api/tasks/${taskId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: draft }),
    });
    const saved: Comment = await res.json();
    comments.push(saved);
    setComments(comments);
    setDraft("");
  }

  return (
    <section>
      <h3>Comments ({comments.length})</h3>
      {comments.map((c) => (
        <div key={c.id}>
          <b>{c.author}</b>
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(c.body) }} />
        </div>
      ))}
      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} />
      <button onClick={post} disabled={!draft.trim()}>
        Comment
      </button>
    </section>
  );
}
