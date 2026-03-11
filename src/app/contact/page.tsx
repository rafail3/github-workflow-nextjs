"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [feedback, setFeedback] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setStatus("success");
      setFeedback(data.message || "Message sent successfully.");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");

      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 pt-44 pb-10">
      <div className="w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
        <h1 className="text-4xl font-bold md:text-5xl">Contact</h1>

        <p className="mt-4 text-lg leading-8 text-gray-300">
          Send us a message and practice a real application workflow with Git,
          GitHub, versioning, CI, and Docker.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-white/25 focus:bg-white/12"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-white/25 focus:bg-white/12"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-white/25 focus:bg-white/12"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex rounded-full border border-white/15 bg-white/10 px-6 py-3 text-base font-medium text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send message"}
          </button>

          {status === "success" && (
            <p className="text-sm text-green-400">{feedback}</p>
          )}

          {status === "error" && (
            <p className="text-sm text-red-400">{feedback}</p>
          )}
        </form>
      </div>
    </main>
  );
}