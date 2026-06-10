import { useState } from 'react';
import { Plus, Clock, X, Check, ChevronUp } from 'lucide-react';
import PostProjectModal from '../components/PostProjectModal';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../hooks/useAuth';

const fetchDashboard = async () => {
  try {
    const { data } = await api.get('/api/v1/users/me/dashboard');
    return data;
  } catch (error) {
    return { projects: [], incoming_requests: [], outgoing_requests: [] };
  }
};

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['dashboard', user?.id],
    queryFn: fetchDashboard,
    enabled: !!user,
  });

  const projects = dashboard?.projects || [];
  const incoming = dashboard?.incoming_requests || [];
  const outgoing = dashboard?.outgoing_requests || [];

  const tabs = [
    { id: 'projects', label: 'My Projects', count: projects.length },
    { id: 'incoming', label: 'Incoming', count: incoming.length },
    { id: 'outgoing', label: 'Sent', count: outgoing.length },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 tracking-tight mb-1">Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage your projects and requests.</p>
          </div>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="bg-logo-blue text-white rounded-full py-2 px-5 text-sm font-medium hover:bg-blue-800 transition-colors flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" /> New Project
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-logo-blue text-logo-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-logo-blue/10 text-logo-blue' : 'bg-gray-100 text-gray-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-xl ring-1 ring-gray-200">
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-5 w-1/2" />
                  <div className="skeleton h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              projects.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
                  <p className="text-gray-500 text-sm mb-4">You haven't posted any projects yet.</p>
                  <button onClick={() => setIsPostModalOpen(true)} className="text-sm text-logo-blue font-medium hover:underline">
                    Post your first project →
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl ring-1 ring-gray-200 divide-y divide-gray-100 overflow-hidden">
                  {projects.map(project => (
                    <Link to={`/projects/${project.id}`} key={project.id} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2 py-0.5 rounded-full ring-1 ring-green-200">
                            {project.status || 'active'}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm truncate">{project.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{project.description}</p>
                      </div>
                      <div className="text-xs text-gray-400 shrink-0 ml-4 flex items-center gap-1">
                        <ChevronUp className="h-3 w-3" /> {project.upvote_count || 0}
                      </div>
                    </Link>
                  ))}
                </div>
              )
            )}

            {/* Incoming Requests */}
            {activeTab === 'incoming' && (
              incoming.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
                  <p className="text-gray-500 text-sm">No incoming requests right now.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {incoming.map(req => (
                    <div key={req.id} className="bg-white rounded-xl p-5 ring-1 ring-gray-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full bg-logo-orange/10 flex items-center justify-center text-[10px] font-bold text-logo-orange ring-1 ring-logo-orange/20">
                              {(req.user_name || 'U').substring(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm font-bold text-gray-900">{req.user_name || req.user_username}</span>
                            <span className="text-xs text-gray-400">· {timeAgo(req.created_at)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Wants to contribute to <Link to={`/projects/${req.project_id}`} className="font-bold text-gray-900 hover:underline">{req.project_title}</Link>
                          </p>
                          <div className="bg-gray-50 p-3 rounded-lg border-l-3 border-logo-blue/30">
                            <p className="text-sm text-gray-600 italic">"{req.message}"</p>
                          </div>
                        </div>
                        {req.status === 'pending' ? (
                          <div className="flex gap-2 shrink-0">
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-full ring-1 ring-red-200 transition-colors">
                              <X className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-full ring-1 ring-green-200 transition-colors">
                              <Check className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs font-bold uppercase text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{req.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* Outgoing Requests */}
            {activeTab === 'outgoing' && (
              outgoing.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
                  <p className="text-gray-500 text-sm mb-4">You haven't applied to any projects yet.</p>
                  <Link to="/projects" className="text-sm text-logo-blue font-medium hover:underline">Browse projects →</Link>
                </div>
              ) : (
                <div className="bg-white rounded-xl ring-1 ring-gray-200 divide-y divide-gray-100 overflow-hidden">
                  {outgoing.map(req => (
                    <div key={req.id} className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-sm text-gray-600">Applied to <Link to={`/projects/${req.project_id}`} className="font-bold text-gray-900 hover:underline">{req.project_title}</Link></p>
                        <span className="text-xs text-gray-400">{timeAgo(req.created_at)}</span>
                      </div>
                      <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                        req.status === 'accepted' ? 'bg-green-50 text-green-700 ring-1 ring-green-200' :
                        req.status === 'declined' ? 'bg-red-50 text-red-700 ring-1 ring-red-200' :
                        'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        )}

        <PostProjectModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      </div>
    </div>
  );
}
