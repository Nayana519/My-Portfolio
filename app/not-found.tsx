import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-text-muted">
        404
      </p>
      <h1 className="mt-4 font-display text-5xl">
        This page hasn't been{" "}
        <span className="gradient-text italic">built</span> yet.
      </h1>
      <p className="mt-4 max-w-md text-sm text-text-muted">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-medium text-white shadow-glow-sm transition-all hover:-translate-y-0.5 hover:shadow-glow"
      >
        Back to Home
      </Link>
    </div>
  );
}
