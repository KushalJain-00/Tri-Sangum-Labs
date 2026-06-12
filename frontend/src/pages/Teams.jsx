import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Building2, GitBranch, Plus, ShieldCheck, Users } from 'lucide-react';

const teams = [
  { name: 'Orbit Robotics Club', focus: 'Hardware, ROS, embedded systems', members: 18, looking: 'Computer vision engineer' },
  { name: 'ByteForge Studio', focus: 'SaaS products for Indian SMBs', members: 6, looking: 'Full-stack intern' },
  { name: 'NLP Crop Lab', focus: 'AI tools for agriculture', members: 9, looking: 'Mobile developer' },
];

const features = [
  { title: 'Create an organization', copy: 'Represent a startup, college club, open source collective, or freelance studio.', icon: Building2 },
  { title: 'Recruit into a team', copy: 'Define roles, review requests, and bring people into projects with context.', icon: Users },
  { title: 'Build a shared portfolio', copy: 'Show projects shipped by the team instead of only individual resumes.', icon: GitBranch },
  { title: 'Control access', copy: 'Keep private project spaces, contributor requests, and internal chats scoped to team members.', icon: ShieldCheck },
];

export default function Teams() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-logo-orange mb-3">Team Building</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-4">
              Form teams around real work.
            </h1>
            <p className="text-gray-600 max-w-2xl leading-relaxed">
              Create teams, recruit contributors, run organization projects, and make collaboration visible.
            </p>
          </div>
          <button className="btn-primary self-start md:self-auto">
            <Plus className="h-4 w-4 mr-2" /> Create Team
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {teams.map((team) => (
            <article key={team.name} className="bg-white rounded-xl p-6 ring-1 ring-gray-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-logo-blue/10 text-logo-blue mb-5">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">{team.name}</h2>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">{team.focus}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
                <span>{team.members} members</span>
                <span className="font-bold text-logo-orange">Needs: {team.looking}</span>
              </div>
            </article>
          ))}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden ring-1 ring-gray-200">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-background-light p-8">
                <Icon className="h-6 w-6 text-logo-blue mb-5" />
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">{feature.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.copy}</p>
              </div>
            );
          })}
        </section>

        <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-1">Teams become more powerful through projects.</h2>
            <p className="text-sm text-gray-500">Start by posting the work your team is trying to ship.</p>
          </div>
          <Link to="/projects" className="btn-secondary">Browse Projects</Link>
        </div>
      </div>
    </div>
  );
}
