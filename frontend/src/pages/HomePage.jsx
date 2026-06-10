import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Rocket, ChevronDown, Sun, Moon, Menu, X } from 'lucide-react';
import Logo from '../components/ui/Logo';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', to: '/projects' },
    { label: 'About', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const howItWorks = [
    {
      icon: Code,
      title: 'Aakriti',
      subtitle: 'Create',
      description: 'Post your idea. Define what you need.',
    },
    {
      icon: Users,
      title: 'Yantrit',
      subtitle: 'Engineer',
      description: 'Find projects. Send a request to collaborate.',
    },
    {
      icon: Rocket,
      title: 'Uday',
      subtitle: 'Rise',
      description: 'Build together. Ship and grow.',
    },
  ];

  return (
    <div className="min-h-screen bg-background-light selection:bg-accent-amber/20">
      {/* ─── Navbar ─── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="hover:opacity-90 transition-opacity shrink-0">
              <Logo size="sm" />
            </Link>

            {/* Center nav links — desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-gray-700 hover:text-accent-blue transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side — desktop */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme toggle placeholder */}
              <button
                className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5" />
              </button>

              <Link
                to="/signin"
                className="text-sm font-medium text-gray-700 hover:text-accent-blue transition-colors"
              >
                Sign In
              </Link>

              <Link to="/signup" className="btn-primary py-2 px-6 text-sm">
                Get Started
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm font-medium text-gray-700 hover:text-accent-blue py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-gray-200" />
              <Link
                to="/signin"
                className="block text-sm font-medium text-gray-700 hover:text-accent-blue py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn-primary block text-center py-2.5 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Section 1 — Hero ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Animated watercolor blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-logo-blue/20 rounded-full mix-blend-multiply blur-3xl animate-blob" />
          <div
            className="absolute top-1/3 right-0 w-72 h-72 sm:w-[28rem] sm:h-[28rem] bg-logo-orange/20 rounded-full mix-blend-multiply blur-3xl animate-blob-slow"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-10 left-1/3 w-64 h-64 sm:w-80 sm:h-80 bg-logo-blue/15 rounded-full mix-blend-multiply blur-3xl animate-blob"
            style={{ animationDelay: '4s' }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6">
          <div className="mb-8 hover:scale-[1.03] transition-transform duration-500">
            <Logo size="xl" stacked />
          </div>

          <p className="font-sans text-lg sm:text-xl text-gray-600 mb-12 tracking-wide">
            Where builders find builders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/projects"
              className="btn-primary text-base px-10 py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Explore Projects
            </Link>
            <Link
              to="/signup"
              className="btn-secondary text-base px-10 py-3.5 hover:-translate-y-0.5 transition-all"
            >
              Post a Project
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>

      {/* ─── Section 2 — How It Works ─── */}
      <section className="relative py-24 px-6 lg:px-8 bg-white/40">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display italic text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            How TriSangum Works
          </h2>
          <p className="text-gray-500 mb-16 max-w-xl mx-auto">
            Three steps from idea to impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="card p-8 flex flex-col items-center text-center ring-1 ring-gray-200 hover:ring-accent-blue/30 hover:shadow-md transition-all group"
                >
                  {/* Icon circle */}
                  <div className="w-14 h-14 rounded-full bg-background-light flex items-center justify-center mb-6 ring-1 ring-gray-200 group-hover:ring-accent-blue/40 transition-colors">
                    <Icon className="h-6 w-6 text-logo-orange" />
                  </div>

                  <h3 className="font-display italic text-xl text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent-blue mb-4">
                    {step.subtitle}
                  </span>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 3 — Stats / Social Proof ─── */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '50+', label: 'Projects' },
              { value: '200+', label: 'Builders' },
              { value: '120+', label: 'Collaborations' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display italic text-5xl lg:text-6xl text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-medium tracking-widest uppercase text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4 — Footer ─── */}
      <footer className="border-t border-gray-200 bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left — Logo + tagline */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <Logo size="sm" />
              <p className="text-xs text-gray-500 tracking-wide">
                Aakriti · Yantrit · Uday
              </p>
              <p className="text-xs text-gray-400">Since 2026</p>
            </div>

            {/* Center — Links */}
            <div className="flex items-center justify-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-gray-500 hover:text-accent-blue transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right — Copyright */}
            <p className="text-xs text-gray-400 text-center md:text-right">
              &copy; {new Date().getFullYear()} TriSangum Labs.
              <br className="sm:hidden" /> Where builders find builders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
