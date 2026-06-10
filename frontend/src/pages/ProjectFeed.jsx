import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight, Clock, Star, TrendingUp, Code, User } from 'lucide-react';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'TriSangum Labs Core',
    description: 'An open-source collaboration platform for builders. Looking for React and FastAPI developers.',
    type: 'open_source',
    timestamp: '2 hours ago',
    tags: ['React', 'FastAPI', 'Tailwind'],
    lookingFor: ['Frontend', 'Backend'],
    author: 'Aakriti Team',
  },
  {
    id: '2',
    title: 'Neural Network Visualizer',
    description: 'A visual tool to understand how neural networks learn and adapt. We need UI designers.',
    type: 'freelance',
    timestamp: '5 hours ago',
    tags: ['Python', 'Three.js'],
    lookingFor: ['UI/UX', '3D Graphics'],
    author: 'Yantrit Dev',
  }
];

export default function ProjectFeed() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-[220px]' : 'w-[56px]'} border-r border-gray-200 bg-white transition-all duration-300 flex flex-col hidden sm:flex`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          {sidebarOpen && <span className="font-semibold text-gray-900">Filters</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-100 rounded-pill text-gray-500">
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
          </button>
        </div>
        <div className="p-2 flex-grow overflow-y-auto">
          {['All', 'Open Source', 'Hiring', 'Closed', 'Freelance'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`w-full text-left px-3 py-2 rounded-card mb-1 flex items-center gap-3 ${activeFilter === filter ? 'bg-accent-blue/10 text-accent-blue font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Code className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{filter}</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-background-light">
        <div className="max-w-7xl mx-auto">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900">Project Feed</h1>
            <div className="flex gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search projects..." className="input-field pl-10" />
              </div>
              <select className="input-field w-auto py-2">
                <option>Latest</option>
                <option>Trending</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <span className="text-sm font-semibold text-gray-500 flex items-center mr-2"><TrendingUp className="h-4 w-4 mr-1"/> Trending:</span>
            {['React', 'AI', 'FastAPI', 'Rust', 'Design'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-pill text-sm text-gray-600 whitespace-nowrap cursor-pointer hover:border-accent-blue hover:text-accent-blue transition-colors">
                #{tag}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PROJECTS.map(project => (
              <div key={project.id} className="card group relative flex flex-col hover:shadow-md transition-shadow">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="badge bg-blue-100 text-blue-700 uppercase tracking-wider">{project.type.replace('_', ' ')}</span>
                    <span className="flex items-center text-xs text-gray-500"><Clock className="h-3 w-3 mr-1" /> {project.timestamp}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 text-gray-900 line-clamp-1">{project.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-pill">#{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between mt-auto">
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    {project.author}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center p-6 text-center z-10 rounded-card">
                  <h4 className="font-semibold text-gray-900 mb-3">Looking for:</h4>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {project.lookingFor.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-pill text-sm font-medium">{skill}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 w-full">
                    <Link to={`/projects/${project.id}`} className="btn-secondary flex-1 py-2">View</Link>
                    <button className="btn-primary flex-1 py-2">Contribute</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <button className="p-2 border border-gray-300 rounded-pill text-gray-500 hover:bg-gray-50" disabled><ChevronLeft className="h-5 w-5" /></button>
            <button className="w-10 h-10 border border-accent-blue bg-accent-blue/10 text-accent-blue rounded-pill font-medium">1</button>
            <button className="w-10 h-10 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-pill font-medium">2</button>
            <button className="w-10 h-10 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-pill font-medium">3</button>
            <button className="p-2 border border-gray-300 rounded-pill text-gray-500 hover:bg-gray-50"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </main>
    </div>
  );
}
