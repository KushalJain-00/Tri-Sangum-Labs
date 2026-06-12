import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { useAuth } from '../hooks/useAuth';

const fetchMessages = async ({ queryKey }) => {
  const [, projectId] = queryKey;
  try {
    const { data } = await api.get(`/api/v1/projects/${projectId}/messages`);
    return data.messages || [];
  } catch {
    // If backend is unreachable or user is unauthorized (403), return empty
    return [];
  }
};

export default function ProjectChat({ projectId }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);
  const [content, setContent] = useState('');

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', projectId],
    queryFn: fetchMessages,
    refetchInterval: 5000, // simple polling for v1
  });

  const mutation = useMutation({
    mutationFn: async (messageText) => {
      const { data } = await api.post(`/api/v1/projects/${projectId}/messages`, { content: messageText });
      return data;
    },
    onSuccess: () => {
      setContent('');
      queryClient.invalidateQueries(['messages', projectId]);
    },
    onError: () => {
      toast.error('Failed to send message');
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    mutation.mutate(content);
  };

  if (!user) return null; // Must be logged in

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[24px] ring-1 ring-gray-900/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-[500px] relative">
      {/* Subtle Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="bg-white/50 backdrop-blur-md px-6 py-5 border-b border-gray-900/5 flex items-center gap-4 relative z-10">
        <div className="p-2.5 bg-logo-blue/10 rounded-full text-logo-blue ring-1 ring-logo-blue/20 shadow-[0_2px_8px_rgb(0,71,179,0.1)]">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-gray-900 tracking-tight text-lg">Team Chat</h3>
          <p className="text-xs font-medium text-gray-500">Encrypted internal communication</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent relative z-10 scrollbar-hide">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-logo-blue"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, i) => {
            const isMe = user.id === msg.user_id;
            return (
              <div key={msg.id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in-up`} style={{ animationDelay: `${(i % 10) * 50}ms` }}>
                <div className={`max-w-[75%] px-5 py-3.5 shadow-sm transition-all duration-300 hover:shadow-md ${isMe ? 'bg-logo-blue text-white rounded-[24px] rounded-br-[4px]' : 'bg-white ring-1 ring-gray-900/5 text-gray-800 rounded-[24px] rounded-bl-[4px]'}`}>
                  {!isMe && <p className="text-[10px] font-bold text-logo-orange uppercase tracking-widest mb-1">{msg.user_id?.substring(0,8)}</p>}
                  <p className="text-[15px] leading-relaxed">{msg.content}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-5 bg-white/60 backdrop-blur-xl border-t border-gray-900/5 relative z-10">
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <input 
            type="text" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 px-6 py-3.5 rounded-full bg-white ring-1 ring-gray-900/10 focus:ring-2 focus:ring-logo-blue/20 outline-none transition-all duration-300 text-[15px] shadow-[0_2px_10px_rgb(0,0,0,0.02)] placeholder:text-gray-400"
          />
          <button 
            type="submit" 
            disabled={mutation.isPending || !content.trim()}
            className="w-12 h-12 rounded-full bg-logo-blue text-white flex items-center justify-center hover:bg-blue-800 shadow-[0_4px_14px_rgb(0,71,179,0.2)] hover:shadow-[0_6px_20px_rgb(0,71,179,0.3)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 shrink-0"
          >
            <Send className="h-5 w-5 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
