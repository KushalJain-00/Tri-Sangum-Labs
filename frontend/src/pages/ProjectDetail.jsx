import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Star, Share2, MapPin, GraduationCap, Clock, ArrowLeft } from 'lucide-react';
import ContributeModal from '../components/ContributeModal';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isContributeOpen, setIsContributeOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb & Back */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors" title="Go back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <nav className="flex items-center text-sm font-medium text-gray-500">
          <Link to="/projects" className="hover:text-gray-900 transition-colors">Projects</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">TriSangum Labs Core</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="badge bg-blue-100 text-blue-700 uppercase tracking-wider">Open Source</span>
            <span className="badge bg-green-100 text-green-700">Building</span>
          </div>
          
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">TriSangum Labs Core</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <button className="btn-secondary py-2 px-4 group">
              <Star className="h-4 w-4 mr-2 text-gray-400 group-hover:text-amber-500 transition-colors" />
              Star
              <span className="ml-2 pl-2 border-l border-gray-300 text-gray-500">124</span>
            </button>
            <button className="p-2.5 rounded-pill border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="prose prose-blue max-w-none mb-10 text-gray-700">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">About the project</h3>
            <p className="mb-4 text-lg">
              TriSangum Labs is a project-first developer collaboration platform for India's builder community. We connect students and developers to ideate, build, and scale side projects together.
            </p>
            <p className="mb-4">
              We're building the core platform using React, Tailwind V4, FastAPI, and Postgres. Currently looking for contributors who want to help build the foundational UI and backend systems.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Tailwind', 'FastAPI', 'Postgres', 'Supabase'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-pill text-sm">#{tag}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Looking For</h3>
            <div className="flex flex-wrap gap-2">
              {['Frontend Developer', 'UI Designer', 'Python Dev'].map(skill => (
                <span key={skill} className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-pill text-sm font-medium">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-accent-blue/10 flex items-center justify-center text-xl font-display font-bold text-accent-blue">
                AT
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Aakriti Team</h3>
                <p className="text-sm text-gray-500">Joined June 2026</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Bangalore, India</div>
              <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> IIT Madras</div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                github.com/trisangum
              </div>
            </div>
            
            <p className="text-sm text-gray-700 italic mb-6">
              "Building tools for builders."
            </p>

            <button onClick={() => setIsContributeOpen(true)} className="btn-primary w-full py-3 mb-3">
              Contribute
            </button>
            <a href="https://github.com/trisangum/core" target="_blank" rel="noreferrer" className="btn-secondary w-full py-3 flex justify-center">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              View Repository
            </a>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
              Contributors
              <span className="badge bg-gray-100 text-gray-600">3</span>
            </h3>
            <div className="flex gap-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-sm font-bold text-blue-700" title="User 1">U1</div>
              <div className="h-10 w-10 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-sm font-bold text-amber-700" title="User 2">U2</div>
              <div className="h-10 w-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm font-bold text-gray-700" title="User 3">U3</div>
            </div>
          </div>
        </div>
      </div>

      <ContributeModal 
        isOpen={isContributeOpen} 
        onClose={() => setIsContributeOpen(false)} 
        projectTitle="TriSangum Labs Core" 
      />
    </div>
  );
}
