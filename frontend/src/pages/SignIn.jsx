import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import Logo from '../components/ui/Logo';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const returnTo = location.state?.returnTo || '/projects';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back.');
      navigate(returnTo, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.detail || error.message || 'Could not sign you in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light grid grid-cols-1 lg:grid-cols-[1fr_0.9fr]">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors self-start">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>

        <div className="w-full max-w-sm mx-auto">
          <Logo size="md" />
          <h1 className="mt-10 mb-3 text-3xl font-display font-bold tracking-tight text-gray-900">
            Sign in to build.
          </h1>
          <p className="mb-8 text-sm text-gray-500 leading-relaxed">
            Manage your projects, respond to contributors, and keep your build history in one place.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="input-field bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                className="input-field bg-white"
                placeholder="Your password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            New here?{' '}
            <Link to="/signup" className="font-semibold text-logo-blue hover:underline">
              Create your builder profile
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex bg-white/50 border-l border-gray-900/10 px-12 py-16 items-center">
        <div className="max-w-md">
          <p className="text-xs font-bold uppercase tracking-widest text-logo-orange mb-4">Project-first network</p>
          <h2 className="text-5xl font-display font-bold tracking-tight text-gray-900 leading-tight mb-6">
            No clout feed. Just real work.
          </h2>
          <p className="text-gray-600 leading-relaxed">
            TriSangum is designed around proof of building: projects created, contributions accepted,
            teams formed, freelance work shipped, and startup roles earned through actual work.
          </p>
        </div>
      </div>
    </div>
  );
}
