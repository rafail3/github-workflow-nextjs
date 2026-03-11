import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 pt-44 pb-10">
      <div className="w-full max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
        <h1 className="text-4xl font-bold md:text-5xl">About</h1>

        <p className="mt-6 text-lg leading-8 text-gray-300">
          This project is a practical demo for learning Git, GitHub workflows,
          pull requests, versioning, GitHub Actions, and modern app delivery.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-full border border-white/15 bg-white/10 px-6 py-3 text-base font-medium text-white transition hover:bg-white/15"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}