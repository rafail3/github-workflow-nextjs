import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container page-section px-6 pt-444">
      <h1>About</h1>
      <p>This page exists to practice a GitHub workflow with branches and PRs.</p>

      <div style={{ marginTop: 16 }}>
        <Link href="/" className="btn">
          Back to Home
        </Link>
      </div>
    </main>
  );
}