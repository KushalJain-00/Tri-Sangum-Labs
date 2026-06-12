import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronUp, ChevronDown, MessageSquare, Clock, TrendingUp, Flame, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

const sampleProjects = [
  {
    id: 'demo-open-source',
    title: 'TriSangum Labs Core',
    description: 'A project-first developer collaboration platform with FastAPI, React, Postgres, and GitHub-aware project pages.',
    type: 'open_source',
    category: 'software',
    tags: ['react', 'fastapi', 'postgres', 'github'],
    upvote_count: 128,
    comment_count: 24,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'demo-hiring',
    title: 'AI crop disease scanner for rural clinics',
    description: 'Hiring a mobile developer to help ship an offline-first Android app around an existing ML model.',
    type: 'hiring',
    category: 'ml',
    tags: ['pytorch', 'android', 'healthtech'],
    upvote_count: 92,
    comment_count: 11,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: 'demo-freelance',
    title: 'Freelance dashboard for a robotics lab',
    description: 'Need a scoped telemetry dashboard with charts, device status, and project documentation.',
    type: 'freelance',
    category: 'hardware',
    tags: ['react', 'websocket', 'robotics'],
    upvote_count: 64,
    comment_count: 8,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
];

const fetchProjects = async ({ queryKey }) => {
  const [, { search, sort, type }] = queryKey;
  const sortMap = { 'Top': 'trending', 'New': 'latest', 'Trending': 'month' };
  try {
    const { data } = await api.get('/api/v1/projects', {
      params: {
        search: search || undefined,
        type: type !== 'all' ? type : undefined,
        sort: sortMap[sort] || 'latest',
      }
    });
    return data.projects?.length ? data.projects : sampleProjects;
  } catch {
    return sampleProjects;
  }
};

const TABS = [
  { id: 'Top', icon: Flame, label: 'Top' },
  { id: 'New', icon: Sparkles, label: 'New' },
  { id: 'Trending', icon: TrendingUp, label: 'Trending' },
];

const TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'open_source', label: 'Open Source' },
  { id: 'hiring', label: 'Hiring' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'closed', label: 'Private' },
];

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function ProjectFeed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('New');
  const [activeType, setActiveType] = useState('all');

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects', { search: searchQuery, sort: activeTab, type: activeType }],
    queryFn: fetchProjects,
  });

  const visibleProjects = projects.filter((project) => activeType === 'all' || project.type === activeType);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 tracking-tight mb-1">Projects</h1>
          <p className="text-gray-500 text-sm">Open source, hiring, freelance, private builds, and startup work in one feed.</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white ring-1 ring-gray-200 focus:ring-2 focus:ring-logo-blue/30 outline-none text-sm placeholder:text-gray-400 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-logo-blue text-logo-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-3">
          {TYPE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveType(filter.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeType === filter.id
                  ? 'bg-logo-blue text-white'
                  : 'bg-white text-gray-500 ring-1 ring-gray-200 hover:text-gray-900'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Feed */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 p-4">
                <div className="w-10 flex flex-col items-center gap-1">
                  <div className="skeleton w-6 h-4" />
                  <div className="skeleton w-8 h-5" />
                  <div className="skeleton w-6 h-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                  <div className="flex gap-2">
                    <div className="skeleton h-5 w-16 rounded-full" />
                    <div className="skeleton h-5 w-16 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : visibleProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-500 text-sm">No projects found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl ring-1 ring-gray-200 divide-y divide-gray-100 overflow-hidden">
            {visibleProjects.map((project) => (
              <div key={project.id} className="flex items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors group">
                
                {/* Vote column */}
                <div className="flex flex-col items-center gap-0.5 pt-0.5 shrink-0 w-10">
                  <button className="p-0.5 text-gray-400 hover:text-logo-blue transition-colors rounded">
                    <ChevronUp className="h-5 w-5" />
                  </button>
                  <span className="text-sm font-bold text-gray-900 tabular-nums">{project.upvote_count || 0}</span>
                  <button className="p-0.5 text-gray-400 hover:text-red-500 transition-colors rounded">
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-logo-blue bg-logo-blue/5 px-2 py-0.5 rounded-full ring-1 ring-logo-blue/10">
                      {(project.type || 'open_source').replace('_', ' ')}
                    </span>
                    {project.category && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <Link to={`/projects/${project.id}`} className="block">
                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-1 group-hover:text-logo-blue transition-colors">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-500 line-clamp-1 mb-2 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                    {(project.tags || []).slice(0, 4).map(tag => (
                      <span key={tag} className="text-gray-500">#{tag}</span>
                    ))}
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> {project.comment_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {timeAgo(project.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
