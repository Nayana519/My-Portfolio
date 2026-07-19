"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // placeholder email integration
    window.location.href = `mailto:nayanajk159@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(
      form.name
    )}&body=${encodeURIComponent(form.message + "\n\n" + form.email)}`;
    setSent(true);
    setForm(initialState);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <Card hover={false} className="relative glass-warm border-gradient-left">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-text-faint">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent-1 focus:ring-2 focus:ring-accent-1/30"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-accent-1">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-text-faint">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent-1 focus:ring-2 focus:ring-accent-1/30"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-accent-1">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-text-faint">
            Message
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full resize-none rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent-1 focus:ring-2 focus:ring-accent-1/30"
            placeholder="Tell me about the opportunity or idea..."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-accent-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient text-sm font-medium text-white shadow-glow-sm transition-all hover:-translate-y-0.5 hover:shadow-glow shimmer-sweep"
        >
          Send Message <Send size={15} />
        </button>
      </form>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass-warm absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs text-text-primary shadow-glow-sm"
          >
            <CheckCircle2 size={14} className="text-accent-2" /> Message ready to send
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
