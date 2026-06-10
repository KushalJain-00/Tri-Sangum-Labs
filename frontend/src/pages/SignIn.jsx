import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-background-light">
      
      {/* Left side: The Form */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <button onClick={() => window.history.back()} className="mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors self-start">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>

        <div className="w-full max-w-sm mx-auto">
          <h2 className="mb-8 text-3xl font-display font-bold italic leading-9 tracking-tight text-gray-900 text-center">
            Sign In
          </h2>

          <form className="space-y-5" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email / Username <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input id="email" name="email" type="text" required className="input-field bg-gray-100/50" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input id="password" name="password" type="password" required className="input-field bg-gray-100/50" />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="btn-primary w-full py-3 !bg-accent-blue text-white">
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-8 space-y-3">
            <button className="flex w-full items-center justify-center gap-3 rounded-pill bg-gray-200/50 px-3 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-200 transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <button className="flex w-full items-center justify-center gap-3 rounded-pill bg-[#24292F] px-3 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#24292F]/90 transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              Continue with GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 font-display italic">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-accent-blue hover:text-blue-500">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Decorative blob panel */}
      <div className="hidden lg:flex relative bg-gray-100/50 flex-col items-center justify-center overflow-hidden border-l border-gray-200">
        {/* Animated blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-logo-blue/30 rounded-full mix-blend-multiply blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-logo-orange/30 rounded-full mix-blend-multiply blur-3xl animate-blob-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-300/40 rounded-full mix-blend-multiply blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

        {/* Logo */}
        <div className="relative z-10 flex flex-col items-center transition-transform duration-500 hover:scale-110">
          <span className="text-5xl font-display font-bold italic text-logo-brown">Tri</span>
          <span className="text-5xl font-display font-bold italic text-logo-blue">Sangum</span>
          <span className="text-4xl font-sans font-bold text-logo-orange">लैब</span>
        </div>
      </div>

    </div>
  );
}
