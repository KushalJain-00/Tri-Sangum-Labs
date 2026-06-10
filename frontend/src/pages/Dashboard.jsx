import { useState } from 'react';
import { Plus, Check, X, Clock } from 'lucide-react';
import PostProjectModal from '../components/PostProjectModal';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard</h1>
        <button onClick={() => setIsPostModalOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </button>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'projects', label: 'My Projects' },
            { id: 'incoming', label: 'Incoming Requests', count: 2 },
            { id: 'outgoing', label: 'My Requests' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id 
                  ? 'border-accent-blue text-accent-blue' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              {tab.count ? (
                <span className={`ml-2 rounded-full py-0.5 px-2.5 text-xs font-medium ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-900'}`}>
                  {tab.count}
                </span>
              ) : null}
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTab === 'projects' && (
          <div className="text-center py-24 bg-white rounded-card border border-gray-200 border-dashed">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
            <p className="mt-1 text-sm text-gray-500">You have not posted anything yet.</p>
            <div className="mt-6">
              <button onClick={() => setIsPostModalOpen(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Post your first project
              </button>
            </div>
          </div>
        )}

        {activeTab === 'incoming' && (
          <div className="space-y-4">
            {[1, 2].map(id => (
              <div key={id} className="card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">Rahul Sharma</span>
                    <span className="text-sm text-gray-500 flex items-center"><Clock className="h-3 w-3 mr-1" /> 2 hours ago</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Wants to contribute to <span className="font-medium text-gray-900">TriSangum Labs Core</span></p>
                  <p className="text-gray-700 italic text-sm">"I have 2 years of experience with React and Tailwind. Would love to help build the frontend!"</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="btn-secondary flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 ring-red-200">
                    <X className="h-4 w-4 mr-1" /> Decline
                  </button>
                  <button className="btn-primary flex-1 sm:flex-none">
                    <Check className="h-4 w-4 mr-1" /> Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'outgoing' && (
          <div className="text-center py-24 bg-white rounded-card border border-gray-200 border-dashed">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No requests sent</h3>
            <p className="mt-1 text-sm text-gray-500">You have not applied to any projects yet.</p>
            <div className="mt-6">
              <button className="btn-secondary">
                Browse projects
              </button>
            </div>
          </div>
        )}
      </div>

      <PostProjectModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
    </div>
  );
}
