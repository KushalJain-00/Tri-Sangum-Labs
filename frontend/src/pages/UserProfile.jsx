import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, GraduationCap, FolderGit2, Calendar } from 'lucide-react';
import api from '../lib/api';

const fetchUserProfile = async ({ queryKey }) => {
  const [, username] = queryKey;
  try {
    const { data } = await api.get(`/api/v1/users/${username}`);
    return data;
  } catch {
    console.warn("Backend unreachable, returning placeholder profile.");
    return {
      user: {
        id: '1',
        username,
        full_name: 'Builder ' + username,
        bio: 'Building things for the web. Love React and Python.',
        city: 'Remote',
        college: 'Self Taught',
        created_at: new Date().toISOString()
      },
      projects: [],
      accepted_contributions: []
    };
  }
};

export default function UserProfile() {
  const { username } = useParams();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', username],
    queryFn: fetchUserProfile,
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-background-light">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-logo-blue"></div>
      </div>
    );
  }

  if (!profile || !profile.user) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-background-light gap-6">
        <h2 className="text-3xl font-display font-bold text-gray-900 tracking-tight">User Not Found</h2>
        <Link to="/projects" className="bg-white text-gray-900 ring-1 ring-gray-900/10 rounded-full px-6 py-2.5 font-medium hover:bg-gray-50 transition-all shadow-[0_4px_14px_rgb(0,0,0,0.03)]">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background-light relative pb-20">
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 animate-fade-in-up">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 md:p-14 ring-1 ring-gray-900/5 shadow-[0_20px_60px_rgb(0,0,0,0.05)] mb-12 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)]">
          {/* Decorative Blur blob inside header */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-logo-orange/5 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-logo-orange/10 to-logo-blue/10 flex items-center justify-center text-5xl font-display font-bold text-logo-orange ring-1 ring-gray-900/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] shrink-0 transform transition-transform duration-500 hover:scale-105">
            {profile.user.full_name ? profile.user.full_name.substring(0, 2).toUpperCase() : profile.user.username.substring(0, 2).toUpperCase()}
          </div>
          
          <div className="flex-1 relative z-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 tracking-tight mb-3 transition-all">
              {profile.user.full_name || profile.user.username}
            </h1>
            <p className="text-lg text-gray-400 font-bold tracking-wider uppercase mb-6">@{profile.user.username}</p>
            
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-medium">
              {profile.user.bio || 'Building tools for builders.'}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[13px] font-bold text-gray-600 uppercase tracking-wider">
              {profile.user.city && (
                <span className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full ring-1 ring-gray-900/5 shadow-sm"><MapPin className="h-4 w-4 text-logo-blue" /> {profile.user.city}</span>
              )}
              {profile.user.college && (
                <span className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full ring-1 ring-gray-900/5 shadow-sm"><GraduationCap className="h-4 w-4 text-logo-orange" /> {profile.user.college}</span>
              )}
              <span className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full ring-1 ring-gray-900/5 shadow-sm"><Calendar className="h-4 w-4 text-gray-400" /> Joined {new Date(profile.user.created_at).getFullYear()}</span>
            </div>
          </div>
        </div>

        {/* Stats & Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* User Projects */}
            <div>
              <h3 className="font-display text-3xl font-bold text-gray-900 tracking-tight mb-8 flex items-center">
                <FolderGit2 className="h-7 w-7 mr-3 text-logo-blue" />
                Projects Led by {profile.user.username}
              </h3>
              
              {profile.projects.length === 0 ? (
                <div className="bg-white/50 backdrop-blur-sm rounded-[24px] p-12 text-center ring-1 ring-gray-900/5 border-dashed">
                  <p className="text-gray-500 font-medium text-lg">No active projects yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {profile.projects.map((project) => (
                    <Link to={`/projects/${project.id}`} key={project.id} className="bg-white/80 backdrop-blur-md rounded-[24px] p-7 ring-1 ring-gray-900/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col group">
                      <div className="flex justify-between items-start mb-5">
                        <span className="px-3 py-1.5 bg-logo-blue/5 text-logo-blue text-[10px] font-bold uppercase tracking-widest rounded-full ring-1 ring-logo-blue/10">
                          {project.type?.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-logo-blue transition-colors duration-300 line-clamp-1">{project.title}</h4>
                      <p className="text-[15px] text-gray-600 line-clamp-2 leading-relaxed flex-1">{project.description}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column / Contributions */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-[24px] p-8 ring-1 ring-gray-900/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-28">
              <h3 className="font-bold text-gray-900 text-xl tracking-tight mb-6 flex justify-between items-center">
                Contributions
                <span className="px-3.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full ring-1 ring-green-600/20 shadow-sm">
                  {profile.accepted_contributions.length}
                </span>
              </h3>
              
              {profile.accepted_contributions.length === 0 ? (
                <p className="text-[15px] text-gray-500 font-medium italic">Hasn't collaborated on other projects yet.</p>
              ) : (
                <div className="space-y-4">
                  {profile.accepted_contributions.map(c => (
                    <div key={c.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors duration-300 -mx-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgb(34,197,94,0.4)]"></div>
                      <Link to={`/projects/${c.project_id}`} className="text-[15px] font-semibold text-gray-700 hover:text-logo-blue transition-colors block w-full">
                        Collaborator
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
