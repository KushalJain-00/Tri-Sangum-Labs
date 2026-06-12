import { Link } from 'react-router-dom';
import { BadgeIndianRupee, CalendarDays, CheckCircle2, Clock, FileText, Send } from 'lucide-react';

const gigs = [
  { title: 'Build a React dashboard for a college fest platform', budget: 'Rs 35k - 55k', duration: '3 weeks', skills: ['react', 'charts', 'tailwind'] },
  { title: 'Optimize FastAPI backend and Postgres queries', budget: 'Rs 25k - 40k', duration: '10 days', skills: ['fastapi', 'postgres', 'sqlalchemy'] },
  { title: 'Design landing page and onboarding for a robotics tool', budget: 'Rs 18k - 30k', duration: '2 weeks', skills: ['ui design', 'copy', 'figma'] },
];

const flow = [
  { title: 'Post scoped work', copy: 'Describe deliverables, budget, timeline, and required skills.', icon: FileText },
  { title: 'Receive proposals', copy: 'Individuals, teams, and organizations can apply with relevant build history.', icon: Send },
  { title: 'Hire by proof', copy: 'Evaluate applicants by real project work, not inflated titles.', icon: CheckCircle2 },
];

export default function Freelance() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-logo-orange mb-3">Freelancing</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Freelance work for builders, teams, and startups.
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Post serious scoped work, apply with project evidence, and keep freelance discovery inside the builder ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <main className="bg-white rounded-xl ring-1 ring-gray-200 divide-y divide-gray-100 overflow-hidden">
            {gigs.map((gig) => (
              <article key={gig.title} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-gray-900 mb-2">{gig.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1.5"><BadgeIndianRupee className="h-3.5 w-3.5" /> {gig.budget}</span>
                      <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {gig.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {gig.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">#{skill}</span>
                      ))}
                    </div>
                  </div>
                  <button className="btn-secondary shrink-0">Send Proposal</button>
                </div>
              </article>
            ))}
          </main>

          <aside className="space-y-5">
            {flow.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-xl p-5 ring-1 ring-gray-200">
                  <Icon className="h-5 w-5 text-logo-blue mb-3" />
                  <h2 className="font-bold text-gray-900 mb-1">{item.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.copy}</p>
                </div>
              );
            })}
            <div className="rounded-xl bg-logo-orange/10 p-5 ring-1 ring-logo-orange/20">
              <Clock className="h-5 w-5 text-logo-orange mb-3" />
              <h2 className="font-bold text-gray-900 mb-1">Marketplace controls come next.</h2>
              <p className="text-sm text-gray-600 leading-relaxed">Payments and milestones should be added after trust, proposals, and project evidence work well.</p>
            </div>
          </aside>
        </div>

        <div className="mt-10 text-center">
          <Link to="/projects" className="text-sm font-bold text-logo-blue hover:underline">View freelance-tagged projects</Link>
        </div>
      </div>
    </div>
  );
}
