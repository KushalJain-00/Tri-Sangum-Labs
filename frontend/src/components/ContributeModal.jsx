import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

export default function ContributeModal({ isOpen, onClose, projectId, projectTitle }) {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/api/v1/projects/${projectId}/contribute`, { message });
      return data;
    },
    onSuccess: () => {
      toast.success('Contribution request sent.');
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setMessage('');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Could not send the request.');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim().length < 20) {
      toast.error('Write at least 20 characters so the owner has context.');
      return;
    }
    mutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-card w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-display font-bold text-gray-900">
            Contribute to {projectTitle}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form className="p-6" onSubmit={handleSubmit}>
          <p className="text-gray-600 mb-6">
            Tell the owner how you can help. Mention your relevant skills, past experience, or what specifically interests you about the project.
          </p>

          <div className="mb-6">
            <textarea 
              className="w-full rounded-2xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-blue" 
              rows="5" 
              placeholder="Hi! I have 2 years of experience with..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
            ></textarea>
            <div className="mt-2 text-right text-sm text-gray-500">
              {message.length}/500 characters
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={mutation.isPending} className="btn-primary">
              {mutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
