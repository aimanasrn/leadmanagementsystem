export function LeadFilters() {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      <label className="flex flex-col gap-1">
        <span>Stage</span>
        <select aria-label="Stage" className="border p-2">
          <option>All</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span>Source</span>
        <select aria-label="Source" className="border p-2">
          <option>All</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span>Search</span>
        <input aria-label="Search" className="border p-2" />
      </label>
    </section>
  );
}
