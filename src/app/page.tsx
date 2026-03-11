export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-44">
      <h1 className="text-center text-5xl font-bold md:text-7xl">
        GitHub Workflow Demo
      </h1>

      <p className="max-w-2xl text-center text-lg text-gray-400 md:text-xl">
        Versioned with Git, GitHub, and GitHub Actions.
      </p>
    </main>
  );
}