import { LeadTimeline } from "../../components/leads/LeadTimeline";
import { TaskList } from "../tasks/TaskList";

export function LeadDetailPage() {
  return (
    <main className="grid gap-6 p-4 md:grid-cols-[2fr_1fr] md:p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold">Aina Rahman</h1>
          <p className="text-sm text-slate-600">Website lead</p>
        </header>
        <div className="border p-4">Profile, owner, notes, and stage controls go here.</div>
        <LeadTimeline />
      </section>
      <TaskList />
    </main>
  );
}
