import { Link, Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Logo from '../ui/Logo';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light selection:bg-accent-amber/20">
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <Logo size="sm" />
            </Link>
            
            <div className="hidden sm:flex sm:gap-6 sm:items-center">
              <Link to="/projects" className="text-sm font-medium text-gray-700 hover:text-accent-blue transition-colors">
                Explore
              </Link>
              <Link to="/signin" className="text-sm font-medium text-gray-700 hover:text-accent-blue transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary py-2 px-5 text-sm">
                Get Started
              </Link>
            </div>

            <div className="sm:hidden flex items-center">
              <button className="text-gray-500 hover:text-gray-900 p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start items-center mb-4 md:mb-0">
              <Logo size="sm" />
            </div>
            <p className="text-center text-sm leading-5 text-gray-500 md:text-left">
              &copy; {new Date().getFullYear()} TriSangum Labs. Where builders find builders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
