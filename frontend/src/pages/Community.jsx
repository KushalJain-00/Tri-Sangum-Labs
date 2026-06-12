import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, HelpCircle, MessageSquare, Radio, Search, TrendingUp } from 'lucide-react';

const threads = [
  {
    type: 'Q&A',
    title: 'How should I structure FastAPI services for project permissions?',
    meta: '12 answers · backend · auth',
    score: 48,
  },
  {
    type: 'Build Log',
    title: 'Week 3 update: browser-based robotics dashboard is finally streaming telemetry',
    meta: 'hardware · websocket · launch notes',
    score: 36,
  },
  {
    type: 'Discussion',
    title: 'What makes an open source issue good for first-time contributors?',
    meta: 'open-source · maintainers',
    score: 29,
  },
];

const spaces = [
  { name: 'Frontend Systems', count: '2.4k builders', icon: Code2 },
  { name: 'AI and ML', count: '1.8k builders', icon: TrendingUp },
  { name: 'Hardware Lab', count: '740 builders', icon: Radio },
  { name: 'Career Questions', count: '1.1k builders', icon: HelpCircle },
];

export default function Community() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <main>
            <p className="text-xs font-bold uppercase tracking-widest text-logo-orange mb-3">Community</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
              A builder forum, not a clout feed.
            </h1>
            <p className="text-gray-600 max-w-2xl leading-relaxed mb-8">
              Ask technical questions, post progress logs, debate architecture, and find collaborators through useful work.
            </p>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input className="w-full rounded-full bg-white py-3 pl-11 pr-4 text-sm ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-logo-blue/30" placeholder="Search questions, logs, tags, and project discussions" />
            </div>

            <div className="bg-white rounded-xl ring-1 ring-gray-200 divide-y divide-gray-100 overflow-hidden">
              {threads.map((thread) => (
                <article key={thread.title} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-12 shrink-0 text-center">
                      <div className="text-lg font-bold text-gray-900">{thread.score}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400">score</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex rounded-full bg-logo-blue/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-logo-blue ring-1 ring-logo-blue/10 mb-2">
                        {thread.type}
                      </span>
                      <h2 className="font-bold text-gray-900 leading-snug mb-1">{thread.title}</h2>
                      <p className="text-xs text-gray-500">{thread.meta}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-300" />
                  </div>
                </article>
              ))}
            </div>
          </main>

          <aside className="space-y-6">
            <div className="bg-white rounded-xl p-6 ring-1 ring-gray-200">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4">Spaces</h2>
              <div className="space-y-3">
                {spaces.map((space) => {
                  const Icon = space.icon;
                  return (
                    <button key={space.name} className="w-full flex items-center gap-3 rounded-xl p-3 text-left hover:bg-gray-50 transition-colors">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-logo-orange/10 text-logo-orange">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-gray-900">{space.name}</span>
                        <span className="block text-xs text-gray-400">{space.count}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-logo-blue rounded-xl p-6 text-white">
              <MessageSquare className="h-6 w-6 mb-4 opacity-80" />
              <h2 className="font-display font-bold text-2xl mb-3 text-white">Start with a project.</h2>
              <p className="text-sm text-white/75 mb-5 leading-relaxed">Every useful conversation should be traceable to something people are building.</p>
              <Link to="/projects" className="inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-logo-blue">
                Explore projects
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
