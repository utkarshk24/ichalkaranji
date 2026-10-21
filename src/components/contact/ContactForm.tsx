"use client";

import { Mail, TriangleAlert } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";

type Topic = "correction" | "accessibility" | "suggestion" | "other";
const topics: Topic[] = ["correction", "accessibility", "suggestion", "other"];

type Labels = {
  formTitle: string;
  topic: string;
  topics: Record<Topic, string>;
  pageUrl: string;
  pageUrlHelp: string;
  name: string;
  message: string;
  messageHelp: string;
  messageError: string;
  required: string;
  submit: string;
  how: string;
  /** Contains "{topic}". */
  subject: string;
  disabledTitle: string;
  disabledBody: string;
};

/**
 * Contact form with no backend: it composes a mailto: link to the portal team's published inbox,
 * so the visitor's own mail app sends it and this site stores nothing. Disabled when no inbox is configured.
 */
export function ContactForm({ email, labels }: { email: string | null; labels: Labels }) {
  const id = useId();
  const [error, setError] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const disabled = !email;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    const data = new FormData(e.currentTarget);
    const message = String(data.get("message") ?? "").trim();
    if (message.length < 10) {
      setError(true);
      messageRef.current?.focus();
      return;
    }
    setError(false);
    const topic = labels.topics[(data.get("topic") as Topic) ?? "other"];
    const page = String(data.get("page") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const body = [message, "", page && `${labels.pageUrl}: ${page}`, name && `${labels.name}: ${name}`].filter((l) => l !== "").join("\n");
    const href = `mailto:${email}?subject=${encodeURIComponent(labels.subject.replace("{topic}", topic))}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  const field = "mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg placeholder:text-fg-muted disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-2xl border border-border bg-surface p-6">
      <h2 id={`${id}-title`} className="flex items-center gap-2 text-xl font-bold tracking-tight">
        <Mail className="h-5 w-5 text-gold" aria-hidden="true" />
        {labels.formTitle}
      </h2>

      {disabled && (
        <div role="status" className="mt-4 flex gap-3 rounded-xl border border-dashed border-border bg-surface-2/60 p-4 text-sm">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          <div>
            <p className="font-semibold">{labels.disabledTitle}</p>
            <p className="mt-1 text-fg-muted">{labels.disabledBody}</p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4" aria-describedby={`${id}-how`}>
        <fieldset disabled={disabled} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">{labels.topic}</span>
            <select name="topic" defaultValue="correction" className={field}>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {labels.topics[t]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium">{labels.pageUrl}</span>
            <input name="page" type="url" inputMode="url" autoComplete="off" aria-describedby={`${id}-page`} className={field} />
            <span id={`${id}-page`} className="mt-1 block text-xs text-fg-muted">
              {labels.pageUrlHelp}
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-medium">{labels.name}</span>
            <input name="name" type="text" autoComplete="name" className={field} />
          </label>

          <label className="block">
            <span className="text-sm font-medium">
              {labels.message} <span className="text-xs font-normal text-fg-muted">({labels.required})</span>
            </span>
            <textarea
              ref={messageRef}
              name="message"
              rows={6}
              required
              aria-required="true"
              aria-invalid={error || undefined}
              aria-describedby={`${id}-help${error ? ` ${id}-err` : ""}`}
              onChange={() => error && setError(false)}
              className={`${field} ${error ? "border-danger" : ""}`}
            />
            <span id={`${id}-help`} className="mt-1 block text-xs text-fg-muted">
              {labels.messageHelp}
            </span>
            {error && (
              <span id={`${id}-err`} className="mt-1 block text-xs font-semibold text-danger">
                {labels.messageError}
              </span>
            )}
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg hover:bg-primary-hover disabled:opacity-50"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {labels.submit}
          </button>
        </fieldset>
        <p id={`${id}-how`} className="text-xs text-fg-muted">
          {labels.how}
        </p>
      </form>
    </section>
  );
}
