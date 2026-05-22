export function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Lead Management System</h1>
      <label className="flex flex-col gap-1">
        <span>Email</span>
        <input aria-label="Email" className="border p-2" type="email" />
      </label>
      <label className="flex flex-col gap-1">
        <span>Password</span>
        <input aria-label="Password" className="border p-2" type="password" />
      </label>
      <button className="bg-black px-4 py-2 text-white" type="button">
        Sign In
      </button>
    </main>
  );
}
