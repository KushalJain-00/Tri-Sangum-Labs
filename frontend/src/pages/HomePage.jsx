import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Building2, Code, MessageSquare, Rocket, ArrowRight, Menu, Users, X } from 'lucide-react';
import Logo from '../components/ui/Logo';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', to: '/projects' },
    { label: 'Community', to: '/community' },
    { label: 'Teams', to: '/teams' },
    { label: 'Freelance', to: '/freelance' },
    { label: 'Hiring', to: '/hiring' },
    { label: 'About', to: '/about' },
  ];

  const pillars = [
    {
      icon: Code,
      title: 'Projects',
      copy: 'Open source, hiring, freelance, stealth, and team projects with GitHub context at the center.',
      to: '/projects',
    },
    {
      icon: MessageSquare,
      title: 'Community',
      copy: 'Technical Q&A, build logs, and useful discussions tied to real builder work.',
      to: '/community',
    },
    {
      icon: Building2,
      title: 'Teams',
      copy: 'Create teams, recruit contributors, and make organization portfolios visible.',
      to: '/teams',
    },
    {
      icon: BriefcaseBusiness,
      title: 'Freelance + Hiring',
      copy: 'Scoped work and startup roles where applicants are judged by proof, not polish.',
      to: '/freelance',
    },
  ];

  return (
    <div className="min-h-screen bg-background-light selection:bg-logo-orange/20">

      {/* ─── Navbar ─── */}
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-background-light/95 backdrop-blur-md border-b border-gray-900/10'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="hover:opacity-80 transition-opacity shrink-0">
              <Logo size="sm" />
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-5">
              <Link to="/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="bg-logo-blue text-white hover:bg-blue-800 rounded-full py-2 px-6 text-sm font-medium transition-colors">
                Get Started
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background-light border-t border-gray-900/10">
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <hr className="border-gray-900/10 my-3" />
              <Link to="/signin" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" className="bg-logo-blue text-white rounded-full block text-center py-2.5 text-sm font-medium mt-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
          <div className="mb-8">
            <Logo size="lg" stacked />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6 leading-[1.15] tracking-tight">
            A network for people who build, not just post.
          </h1>
          
          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Projects, teams, community, freelance work, and hiring, all centered around real proof of building.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/projects"
              className="w-full sm:w-auto bg-logo-blue text-white rounded-full text-sm font-medium px-8 py-3.5 hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              Explore Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-white text-gray-900 ring-1 ring-gray-900/10 rounded-full text-sm font-medium px-8 py-3.5 hover:bg-gray-50 transition-colors text-center"
            >
              Post a Project
            </Link>
          </div>
        </div>
      </section>

      {/* Platform pillars */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden ring-1 ring-gray-200">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link key={pillar.title} to={pillar.to} className="bg-background-light p-7 hover:bg-white transition-colors group">
                <Icon className="h-6 w-6 text-logo-blue mb-5" />
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-2 group-hover:text-logo-blue transition-colors">{pillar.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.copy}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── Marquee ─── */}
      <div className="border-y border-gray-900/10 overflow-hidden py-4 bg-white/50">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 text-sm font-medium text-gray-400 tracking-wider uppercase mr-6">
              <span>Open Source</span><span className="text-logo-orange">✦</span>
              <span>Hardware</span><span className="text-logo-orange">✦</span>
              <span>Machine Learning</span><span className="text-logo-orange">✦</span>
              <span>DevTools</span><span className="text-logo-orange">✦</span>
              <span>Mobile Apps</span><span className="text-logo-orange">✦</span>
              <span>Freelance</span><span className="text-logo-orange">✦</span>
              <span>Web3</span><span className="text-logo-orange">✦</span>
              <span>SaaS</span><span className="text-logo-orange">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── How It Works — Bento Grid ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-logo-orange mb-3 block">How It Works</span>
            <h2 className="font-display text-3xl sm:text-4xl text-gray-900 tracking-tight">
              Three steps. Zero friction.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden ring-1 ring-gray-200">
            {/* Card 1 — spans full width on first row */}
            <div className="md:col-span-2 bg-background-light p-10 md:p-14 flex flex-col md:flex-row items-start gap-8">
              <div className="w-14 h-14 rounded-xl bg-logo-orange/10 flex items-center justify-center shrink-0">
                <Code className="h-7 w-7 text-logo-orange" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-gray-900 mb-2 tracking-tight">
                  Aakriti <span className="text-gray-400 font-normal text-lg">/ Create</span>
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-xl">
                  Define your vision with clarity. Post your project, specify the tech stack, and describe exactly what kind of collaborators you need. No clutter, no noise — just your idea, stated plainly.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-background-light p-10">
              <div className="w-14 h-14 rounded-xl bg-logo-blue/10 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-logo-blue" />
              </div>
              <h3 className="font-display text-2xl text-gray-900 mb-2 tracking-tight">
                Yantrit <span className="text-gray-400 font-normal text-lg">/ Engineer</span>
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Browse the feed. Filter by skill, category, or location. Found something compelling? Send a contribution request with a short pitch.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-background-light p-10">
              <div className="w-14 h-14 rounded-xl bg-logo-brown/10 flex items-center justify-center mb-6">
                <Rocket className="h-7 w-7 text-logo-brown" />
              </div>
              <h3 className="font-display text-2xl text-gray-900 mb-2 tracking-tight">
                Uday <span className="text-gray-400 font-normal text-lg">/ Rise</span>
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Build together. Communicate via project chat. Ship your product and grow your reputation in the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="border-y border-gray-900/10 py-20 px-6 bg-white/50">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            {[
              { value: '50+', label: 'Curated Projects' },
              { value: '200+', label: 'Active Builders' },
              { value: '120+', label: 'Successful Collabs' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-5xl text-gray-900 mb-2 tracking-tight">{stat.value}</p>
                <p className="text-sm font-medium text-gray-400 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900 mb-6 tracking-tight">
            Ready to build something meaningful?
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Join a growing community of engineers, designers, and founders who are tired of building alone.
          </p>
          <Link
            to="/signup"
            className="bg-logo-blue text-white rounded-full text-sm font-medium px-10 py-4 hover:bg-blue-800 transition-colors inline-flex items-center gap-2"
          >
            Create your account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-900/10">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <Logo size="sm" />
              <p className="text-xs font-medium text-gray-400 tracking-wider uppercase">Aakriti · Yantrit · Uday</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{link.label}</Link>
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center md:text-right">
              © {new Date().getFullYear()} TriSangum Labs
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
