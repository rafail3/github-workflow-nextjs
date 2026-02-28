import Link from "next/link";

export default function Header() {
  return (
    <header style={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <strong>GitHub Workflow Demo</strong>
        <nav style={{ display: "flex", gap: 10 }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}