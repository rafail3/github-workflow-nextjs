import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
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