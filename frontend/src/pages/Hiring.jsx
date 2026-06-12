import { Link } from 'react-router-dom';
import { ArrowRight, Building2, GitPullRequest, Search, ShieldCheck, Sparkles, Users } from 'lucide-react';

const candidates = [
  { name: 'Priya Sharma', role: 'ML engineer', proof: 'Accepted contributor on 4 AI projects', tags: ['pytorch', 'mobile ml', 'fastapi'] },
  { name: 'Arjun Patel', role: 'Full-stack builder', proof: 'Maintainer of 2 open source tools', tags: ['react', 'node', 'postgres'] },
  { name: 'Rahul Nair', role: 'Robotics developer', proof: 'Shipped embedded telemetry dashboard', tags: ['ros', 'python', 'hardware'] },
];

const hiringModes = [
  { title: 'Startup roles', copy: 'Find builders comfortable with ambiguity and shipping fast.', icon: Building2 },
  { title: 'Project-based hiring', copy: 'Hire around a concrete product need, not a vague job description.', icon: GitPullRequest },
  { title: 'Team discovery', copy: 'Recruit individuals or whole teams with visible collaboration history.', icon: Users },
  { title: 'Evidence-first screening', copy: 'Evaluate by shipped projects, accepted contributions, and repo activity.', icon: ShieldCheck },
];

export default function Hiring() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-center mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-logo-orange mb-3">Hiring</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-gray-900 mb-5 leading-tight">
              Hire from what people have actually built.
            </h1>
            <p className="text-gray-600 max-w-2xl leading-relaxed mb-8">
              Startups and companies can discover developers through project history, open source contributions, team work, and practical proof.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="btn-primary">Post a Role</button>
              <Link to="/projects" className="btn-secondary">Explore Builders</Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 ring-1 ring-gray-200">
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input className="w-full rounded-full bg-gray-50 py-3 pl-11 pr-4 text-sm ring-1 ring-gray-200 outline-none" placeholder="Search by skill, repo, project, city" />
            </div>
            <div className="space-y-3">
              {candidates.map((candidate) => (
                <article key={candidate.name} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h2 className="font-bold text-gray-900">{candidate.name}</h2>
                      <p className="text-xs text-gray-500">{candidate.role}</p>
                    </div>
                    <Sparkles className="h-4 w-4 text-logo-orange" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{candidate.proof}</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-logo-blue/5 px-2.5 py-1 text-xs font-medium text-logo-blue">#{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden ring-1 ring-gray-200">
          {hiringModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div key={mode.title} className="bg-background-light p-7">
                <Icon className="h-6 w-6 text-logo-blue mb-5" />
                <h2 className="font-display font-bold text-xl text-gray-900 mb-2">{mode.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{mode.copy}</p>
              </div>
            );
          })}
        </section>

        <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-1">The hiring layer gets stronger as projects grow.</h2>
            <p className="text-sm text-gray-500">The platform should earn hiring by first creating genuine contribution history.</p>
          </div>
          <Link to="/community" className="inline-flex items-center text-sm font-bold text-logo-blue hover:underline">
            See builder activity <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
