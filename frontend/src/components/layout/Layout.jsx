import { Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const displayName = user?.full_name || user?.user_metadata?.full_name || user?.email || 'Builder';
  const username = user?.username || user?.user_metadata?.username || 'me';

  const navLinks = [
    { label: 'Projects', to: '/projects' },
    { label: 'Community', to: '/community' },
    { label: 'Teams', to: '/teams' },
    { label: 'Freelance', to: '/freelance' },
    { label: 'Hiring', to: '/hiring' },
    { label: 'About', to: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <nav className="sticky top-0 z-50 w-full border-b border-gray-900/10 bg-background-light/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 justify-between items-center">
            <Link to="/" className="hover:opacity-80 transition-opacity shrink-0">
              <Logo size="sm" />
            </Link>
            
            <div className="hidden lg:flex lg:gap-5 lg:items-center">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden sm:flex sm:items-center sm:gap-4">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Dashboard</Link>
                  <Link to={`/users/${username}`} className="w-8 h-8 rounded-full bg-logo-blue/10 flex items-center justify-center text-xs font-bold text-logo-blue ring-1 ring-logo-blue/10">
                    {displayName.substring(0, 2).toUpperCase()}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signin" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Sign In</Link>
                  <Link to="/signup" className="bg-logo-blue text-white hover:bg-blue-800 rounded-full py-1.5 px-5 text-sm font-medium transition-colors">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            <button className="sm:hidden text-gray-600 hover:text-gray-900 p-1.5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="sm:hidden bg-background-light border-t border-gray-900/10">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>{link.label}</Link>
              ))}
              <hr className="border-gray-900/10 my-2" />
              {user ? (
                <Link to="/dashboard" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              ) : (
                <>
                  <Link to="/signin" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  <Link to="/signup" className="bg-logo-blue text-white rounded-full block text-center py-2 text-sm font-medium mt-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-gray-900/10 mt-auto">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} TriSangum Labs. Where builders find builders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
