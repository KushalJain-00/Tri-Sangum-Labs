import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import Logo from '../components/ui/Logo';

export default function SignUp() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    full_name: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register({
        ...form,
        username: form.username.toLowerCase().trim(),
        full_name: form.full_name.trim(),
      });
      toast.success('Your builder profile is ready.');
      navigate('/projects', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.detail || error.message || 'Could not create your account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light grid grid-cols-1 lg:grid-cols-[0.9fr_1fr]">
      <div className="hidden lg:flex bg-white/50 border-r border-gray-900/10 px-12 py-16 items-center justify-center">
        <div className="max-w-md">
          <p className="text-xs font-bold uppercase tracking-widest text-logo-orange mb-4">Build with evidence</p>
          <h2 className="text-5xl font-display font-bold tracking-tight text-gray-900 leading-tight mb-6">
            Your profile should be made of shipped work.
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Join as a developer, founder, designer, hardware builder, freelancer, team lead, or startup hiring from real contribution history.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors self-start">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>

        <div className="w-full max-w-sm mx-auto">
          <Logo size="md" />
          <h1 className="mt-10 mb-3 text-3xl font-display font-bold tracking-tight text-gray-900">
            Create your builder profile.
          </h1>
          <p className="mb-8 text-sm text-gray-500 leading-relaxed">
            Start projects, join teams, contribute to open source, and make your work discoverable.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                Username
              </label>
              <input id="username" name="username" type="text" required minLength={3} value={form.username} onChange={handleChange} className="input-field bg-white" placeholder="kushalbuilds" />
            </div>

            <div>
              <label htmlFor="full_name" className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                Full Name
              </label>
              <input id="full_name" name="full_name" type="text" required value={form.full_name} onChange={handleChange} className="input-field bg-white" placeholder="Kushal Jain" />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                Email
              </label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="input-field bg-white" placeholder="you@example.com" />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                Password
              </label>
              <input id="password" name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} className="input-field bg-white" placeholder="At least 8 characters" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-logo-blue hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
