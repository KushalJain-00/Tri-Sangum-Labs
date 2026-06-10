import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronUp, Star, Share2, MapPin, GraduationCap, Clock, ArrowLeft, Code, MessageSquare, Send, ExternalLink } from 'lucide-react';
import ContributeModal from '../components/ContributeModal';
import ProjectChat from '../components/ProjectChat';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../lib/api';
import { useAuth } from '../hooks/useAuth';

const fetchProject = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    const { data } = await api.get(`/api/v1/projects/${id}`);
    return data;
  } catch (error) {
    return {
      id,
      title: 'TriSangum Labs Core',
      description: '## About\n\nAn **open-source** collaboration platform for builders.\n\n### What we need\n\n- React developers for the frontend\n- FastAPI developers for the API\n- Someone who knows Postgres well\n\n> "The best way to predict the future is to build it."\n\n```python\ndef hello():\n    print("Welcome to TriSangum")\n```',
      type: 'open_source',
      status: 'building',
      category: 'Software',
      created_at: new Date().toISOString(),
      tags: ['React', 'FastAPI', 'Tailwind', 'Postgres'],
      looking_for: ['Frontend Dev', 'Backend Dev', 'Designer'],
      owner: { id: '1', username: 'kushal', full_name: 'Kushal Jain', city: 'Bangalore', college: 'IIT', reputation: 42 },
      repo_url: 'https://github.com/trisangum/core',
      star_count: 12,
      upvote_count: 34,
      comment_count: 7,
      contributor_count: 3,
    };
  }
};

const fetchComments = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    const { data } = await api.get(`/api/v1/projects/${id}/comments`);
    return data.comments || [];
  } catch {
    return [
      { id: '1', user_id: 'a', content: 'This looks really promising! I have experience with FastAPI and would love to help with the backend.', created_at: new Date(Date.now() - 3600000).toISOString(), author: { username: 'arjun_dev', full_name: 'Arjun Patel', reputation: 28 } },
      { id: '2', user_id: 'b', content: 'What kind of database schema are you using? I noticed you mentioned Postgres — are you using any ORM?', created_at: new Date(Date.now() - 7200000).toISOString(), author: { username: 'priya_codes', full_name: 'Priya Sharma', reputation: 15 } },
      { id: '3', user_id: 'c', parent_id: '2', content: 'We are using SQLAlchemy with async support. The schema is documented in the TRD.', created_at: new Date(Date.now() - 1800000).toISOString(), author: { username: 'kushal', full_name: 'Kushal Jain', reputation: 42 } },
    ];
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

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: fetchProject,
  });

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', id],
    queryFn: fetchComments,
  });

  const commentMutation = useMutation({
    mutationFn: (content) => api.post(`/api/v1/projects/${id}/comments`, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      setCommentText('');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-background-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-12 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-[calc(100vh-5rem)] items-center justify-center flex-col gap-4 bg-background-light">
        <h2 className="text-2xl font-display font-bold text-gray-900">Project Not Found</h2>
        <Link to="/projects" className="text-sm text-logo-blue hover:underline">← Back to Projects</Link>
      </div>
    );
  }

  const owner = project.owner || {};
  const rootComments = comments.filter(c => !c.parent_id);
  const replies = comments.filter(c => c.parent_id);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background-light pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8 text-sm">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <Link to="/projects" className="text-gray-400 hover:text-gray-900 transition-colors">Projects</Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
          <span className="text-gray-900 font-medium truncate">{project.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          {/* Main */}
          <div className="space-y-8 min-w-0">

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-logo-blue bg-logo-blue/5 px-2.5 py-1 rounded-full ring-1 ring-logo-blue/10">
                  {(project.type || '').replace('_', ' ')}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2.5 py-1 rounded-full ring-1 ring-green-200">
                  {project.status || 'open'}
                </span>
                {project.category && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {project.category}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 tracking-tight mb-4">
                {project.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {timeAgo(project.created_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <ChevronUp className="h-3.5 w-3.5" />
                  {project.upvote_count || 0} points
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {project.comment_count || 0} comments
                </span>
                {project.repo_url && (
                  <a href={project.repo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-logo-blue transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Repository
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-y border-gray-200 py-3">
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-logo-blue px-3 py-1.5 rounded-full hover:bg-logo-blue/5 transition-all">
                <ChevronUp className="h-4 w-4" /> Upvote
              </button>
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-amber-600 px-3 py-1.5 rounded-full hover:bg-amber-50 transition-all">
                <Star className="h-4 w-4" /> Star <span className="text-gray-400">{project.star_count || 0}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-all">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>

            {/* Description — Markdown */}
            <div className="prose-project text-gray-700 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.description}
              </ReactMarkdown>
            </div>

            {/* Tech Stack */}
            {(project.tags || []).length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white ring-1 ring-gray-200 text-gray-700 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Looking For */}
            {(project.looking_for || []).length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Looking For</h3>
                <div className="flex flex-wrap gap-2">
                  {project.looking_for.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-logo-orange/5 text-logo-orange ring-1 ring-logo-orange/20 rounded-full text-xs font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Discussion */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                Discussion ({comments.length})
              </h3>

              {/* Comment input */}
              <div className="mb-8">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add to the discussion..."
                  className="w-full rounded-xl border-0 py-3 px-4 text-sm text-gray-900 ring-1 ring-gray-200 focus:ring-2 focus:ring-logo-blue/30 outline-none resize-none placeholder:text-gray-400 transition-all"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => commentMutation.mutate(commentText)}
                    disabled={!commentText.trim() || commentMutation.isPending}
                    className="bg-logo-blue text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-800 transition-colors disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" /> Comment
                  </button>
                </div>
              </div>

              {/* Comments list */}
              <div className="space-y-6">
                {rootComments.map(comment => (
                  <div key={comment.id} className="group">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 ring-1 ring-gray-200">
                        {comment.author?.full_name?.substring(0, 2).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-gray-900">{comment.author?.full_name || 'Anonymous'}</span>
                          <span className="text-xs text-gray-400">@{comment.author?.username}</span>
                          {comment.author?.reputation > 0 && (
                            <span className="text-[10px] font-bold text-logo-orange bg-logo-orange/5 px-1.5 py-0.5 rounded-full">{comment.author.reputation} rep</span>
                          )}
                          <span className="text-xs text-gray-400">· {timeAgo(comment.created_at)}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>

                        {/* Replies */}
                        {replies.filter(r => r.parent_id === comment.id).map(reply => (
                          <div key={reply.id} className="mt-4 ml-4 pl-4 border-l-2 border-gray-100">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-gray-900">{reply.author?.full_name}</span>
                              <span className="text-xs text-gray-400">@{reply.author?.username}</span>
                              {reply.author?.reputation > 0 && (
                                <span className="text-[10px] font-bold text-logo-orange bg-logo-orange/5 px-1.5 py-0.5 rounded-full">{reply.author.reputation} rep</span>
                              )}
                              <span className="text-xs text-gray-400">· {timeAgo(reply.created_at)}</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {comments.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-8">No comments yet. Start the conversation.</p>
                )}
              </div>
            </div>

            {/* Team Chat */}
            <div className="border-t border-gray-200 pt-8">
              <ProjectChat projectId={id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author card */}
            <div className="bg-white rounded-xl p-6 ring-1 ring-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-logo-blue/5 flex items-center justify-center text-base font-display font-bold text-logo-blue ring-1 ring-logo-blue/10">
                  {owner.full_name ? owner.full_name.substring(0, 2).toUpperCase() : 'AT'}
                </div>
                <div>
                  <Link to={`/users/${owner.username || 'unknown'}`} className="font-bold text-gray-900 text-sm hover:text-logo-blue transition-colors block">
                    {owner.full_name || 'Unknown'}
                  </Link>
                  <p className="text-xs text-gray-400">@{owner.username || 'unknown'}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-5 text-xs text-gray-500">
                {owner.city && <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gray-400" /> {owner.city}</div>}
                {owner.college && <div className="flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5 text-gray-400" /> {owner.college}</div>}
                {owner.reputation > 0 && <div className="flex items-center gap-2"><Star className="h-3.5 w-3.5 text-logo-orange" /> {owner.reputation} reputation</div>}
              </div>

              <button onClick={() => setIsContributeOpen(true)} className="w-full bg-logo-blue text-white rounded-full py-2.5 text-sm font-medium hover:bg-blue-800 transition-colors">
                Contribute
              </button>
              {project.repo_url && (
                <a href={project.repo_url} target="_blank" rel="noreferrer" className="w-full mt-2 bg-white text-gray-900 ring-1 ring-gray-200 rounded-full py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
                  <Code className="h-3.5 w-3.5" /> Repository
                </a>
              )}
            </div>

            {/* Contributors */}
            <div className="bg-white rounded-xl p-6 ring-1 ring-gray-200">
              <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center justify-between">
                Contributors
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">{project.contributor_count || 3}</span>
              </h3>
              <div className="flex -space-x-2">
                {['logo-blue', 'logo-orange', 'logo-brown'].slice(0, project.contributor_count || 3).map((color, i) => (
                  <div key={i} className={`h-9 w-9 rounded-full bg-${color}/10 border-2 border-white flex items-center justify-center text-xs font-bold text-${color} ring-1 ring-gray-200`}>
                    U{i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ContributeModal 
          isOpen={isContributeOpen} 
          onClose={() => setIsContributeOpen(false)} 
          projectTitle={project.title} 
        />
      </div>
    </div>
  );
}
