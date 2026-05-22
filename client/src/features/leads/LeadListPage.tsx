import { LeadFilters } from "../../components/leads/LeadFilters";

export function LeadListPage() {
  return (
    <main className="space-y-4 p-4 md:p-6">
      <header>
        <h1 className="text-2xl font-semibold">Leads</h1>
      </header>
      <LeadFilters />
      <section className="overflow-auto border">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Stage</th>
              <th className="p-3 text-left">Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3">Aina Rahman</td>
              <td className="p-3">New</td>
              <td className="p-3">Unassigned</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
