export function ImportPage() {
  return (
    <main className="space-y-4 p-4 md:p-6">
      <h1 className="text-2xl font-semibold">CSV Import</h1>
      <button className="bg-black px-4 py-2 text-white" type="button">
        Upload CSV
      </button>
      <section className="border p-4">
        <h2 className="text-lg font-medium">Validation Summary</h2>
      </section>
    </main>
  );
}
