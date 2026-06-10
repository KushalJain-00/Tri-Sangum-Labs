import { ArrowLeft, Code, Users, Rocket } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background-light">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="mb-12 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>

        {/* Page heading */}
        <h1 className="text-5xl sm:text-6xl font-display font-bold italic text-gray-900 mb-16">
          About
        </h1>

        {/* What is TriSangum Labs */}
        <section className="mb-16">
          <h2 className="text-2xl font-display italic text-gray-900 mb-6">
            What is TriSangum Labs?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            TriSangum Labs is a project-first collaboration platform built for India's builder community. We exist because talented developers, designers, and creators shouldn't have to build alone.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Post your idea, find collaborators who share your excitement, and build something real together. No algorithmic feeds, no vanity metrics — just real projects and real people.
          </p>
        </section>

        {/* The Philosophy */}
        <section className="mb-16">
          <h2 className="text-2xl font-display italic text-gray-900 mb-8">
            The Philosophy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Every great project begins the same way: someone has an idea, someone builds it, and together they make it bigger than either could alone. We've distilled this into three pillars.
          </p>

          <div className="space-y-8">
            {[
              {
                icon: Code,
                title: 'Aakriti',
                subtitle: 'Create',
                color: 'text-logo-brown',
                bg: 'bg-logo-brown/10',
                description: 'The spark. Post your idea. Define what you\'re building and the specific skills you need to bring it to life. Every project starts with a creator who dares to begin.',
              },
              {
                icon: Users,
                title: 'Yantrit',
                subtitle: 'Engineer',
                color: 'text-logo-blue',
                bg: 'bg-logo-blue/10',
                description: 'The hands. Find projects that match your skills and interests. Send a request to contribute and start writing code alongside a team that needs you.',
              },
              {
                icon: Rocket,
                title: 'Uday',
                subtitle: 'Rise',
                color: 'text-logo-orange',
                bg: 'bg-logo-orange/10',
                description: 'The ascent. Ship your project. Gain stars, build your portfolio, and rise together. The best collaborations create things neither person imagined alone.',
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="flex gap-6 items-start">
                  <div className={`shrink-0 w-12 h-12 rounded-full ${pillar.bg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${pillar.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display italic text-xl text-gray-900 mb-1">
                      {pillar.title}{' '}
                      <span className="text-sm font-sans not-italic font-semibold tracking-widest uppercase text-gray-400 ml-2">
                        {pillar.subtitle}
                      </span>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* The Name */}
        <section className="mb-16">
          <h2 className="text-2xl font-display italic text-gray-900 mb-6">
            The Name
          </h2>
          <div className="card p-8 bg-white/70">
            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-display italic font-bold text-logo-brown">Tri</span>
              <span className="font-display italic font-bold text-logo-blue">Sangum</span>{' '}
              means <em>"the confluence of three"</em> in Sanskrit. Like the sacred meeting of three rivers, we bring together creators, engineers, and builders at a single point — where ideas become real.
            </p>
            <p className="mt-4 text-gray-500 leading-relaxed">
              <span className="font-sans font-bold text-logo-orange">लैब</span> — the Lab. Because this is where experiments happen, where things get built, where the messy, exciting work of creation takes place.
            </p>
          </div>
        </section>

        {/* Built in India */}
        <section className="text-center py-12 border-t border-gray-200">
          <p className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-2">
            Built with ❤️ in India
          </p>
          <p className="text-xs text-gray-400">
            Aakriti · Yantrit · Uday — Since 2026
          </p>
        </section>
      </div>
    </div>
  );
}
