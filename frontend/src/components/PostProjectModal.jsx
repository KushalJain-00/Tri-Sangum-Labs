import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api';

export default function PostProjectModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'open_source',
    category: 'Software',
    tech_stack: '',
    looking_for: '',
    city: '',
    college: '',
    repo_url: ''
  });

  const mutation = useMutation({
    mutationFn: async (newProject) => {
      // Clean up arrays
      const payload = {
        ...newProject,
        tech_stack: newProject.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
        looking_for: newProject.looking_for.split(',').map(s => s.trim()).filter(Boolean),
      };
      const { data } = await api.post('/api/v1/projects', payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success('Project posted successfully!');
      queryClient.invalidateQueries(['projects']);
      onClose();
      if (data && data.id) {
        navigate(`/projects/${data.id}`);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to post project');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-background-light rounded-[32px] w-full max-w-3xl shadow-[0_20px_60px_rgb(0,0,0,0.1)] my-8 relative overflow-hidden ring-1 ring-white/50 animate-scale-in">
        {/* Subtle Background Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-logo-blue/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-logo-orange/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex items-center justify-between p-8 border-b border-gray-900/5 relative z-10 bg-white/50 backdrop-blur-md">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 tracking-tight">Post a Project</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Define what you are building and who you need.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 p-2.5 rounded-full hover:bg-white ring-1 ring-transparent hover:ring-gray-900/10 transition-all duration-300 shadow-sm">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-7 relative z-10 bg-white/40 backdrop-blur-sm">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2">Project Title *</label>
            <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full px-5 py-3.5 rounded-full bg-white ring-1 ring-gray-900/10 focus:ring-2 focus:ring-logo-blue/30 hover:ring-gray-900/20 outline-none shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-300 text-[15px] placeholder:text-gray-400" placeholder="E.g., TriSangum Labs Core" />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2">Description *</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full rounded-[24px] border-0 py-4 px-5 bg-white text-gray-900 shadow-[0_2px_8px_rgb(0,0,0,0.02)] ring-1 ring-inset ring-gray-900/10 focus:ring-2 focus:ring-inset focus:ring-logo-blue/30 hover:ring-gray-900/20 outline-none transition-all duration-300 text-[15px] placeholder:text-gray-400" rows="5" placeholder="What is the vision? What are the core features?"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2">Project Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-5 py-3.5 rounded-full bg-white ring-1 ring-gray-900/10 focus:ring-2 focus:ring-logo-blue/30 hover:ring-gray-900/20 outline-none shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-300 text-[15px] text-gray-800 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[position:right_1.5rem_center] bg-no-repeat pr-10">
                <option value="open_source">Open Source</option>
                <option value="closed">Closed / Stealth</option>
                <option value="hiring">Hiring / Paid</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-5 py-3.5 rounded-full bg-white ring-1 ring-gray-900/10 focus:ring-2 focus:ring-logo-blue/30 hover:ring-gray-900/20 outline-none shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-300 text-[15px] text-gray-800 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[position:right_1.5rem_center] bg-no-repeat pr-10">
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Mobile App">Mobile App</option>
                <option value="DevTools">DevTools</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2">Tech Stack <span className="text-gray-400 font-medium normal-case tracking-normal ml-1">(comma separated)</span></label>
            <input name="tech_stack" value={formData.tech_stack} onChange={handleChange} type="text" className="w-full px-5 py-3.5 rounded-full bg-white ring-1 ring-gray-900/10 focus:ring-2 focus:ring-logo-blue/30 hover:ring-gray-900/20 outline-none shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-300 text-[15px] placeholder:text-gray-400" placeholder="React, Tailwind, Postgres" />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2">What kind of help do you need?</label>
            <input name="looking_for" value={formData.looking_for} onChange={handleChange} type="text" className="w-full px-5 py-3.5 rounded-full bg-white ring-1 ring-gray-900/10 focus:ring-2 focus:ring-logo-blue/30 hover:ring-gray-900/20 outline-none shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-300 text-[15px] placeholder:text-gray-400" placeholder="UI Designer, Postgres Expert" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2">City <span className="text-gray-400 font-medium normal-case tracking-normal ml-1">(Optional)</span></label>
              <input name="city" value={formData.city} onChange={handleChange} type="text" className="w-full px-5 py-3.5 rounded-full bg-white ring-1 ring-gray-900/10 focus:ring-2 focus:ring-logo-blue/30 hover:ring-gray-900/20 outline-none shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-300 text-[15px] placeholder:text-gray-400" placeholder="Bangalore" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2">College <span className="text-gray-400 font-medium normal-case tracking-normal ml-1">(Optional)</span></label>
              <input name="college" value={formData.college} onChange={handleChange} type="text" className="w-full px-5 py-3.5 rounded-full bg-white ring-1 ring-gray-900/10 focus:ring-2 focus:ring-logo-blue/30 hover:ring-gray-900/20 outline-none shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-300 text-[15px] placeholder:text-gray-400" placeholder="IIT Madras" />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-widest mb-2">Repository URL <span className="text-gray-400 font-medium normal-case tracking-normal ml-1">(Optional)</span></label>
            <input name="repo_url" value={formData.repo_url} onChange={handleChange} type="url" className="w-full px-5 py-3.5 rounded-full bg-white ring-1 ring-gray-900/10 focus:ring-2 focus:ring-logo-blue/30 hover:ring-gray-900/20 outline-none shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-300 text-[15px] placeholder:text-gray-400" placeholder="https://github.com/..." />
          </div>

          <div className="pt-8 border-t border-gray-900/5 flex justify-end gap-4 mt-10 bg-white/50 backdrop-blur-md -mx-8 -mb-8 p-8 rounded-b-[32px]">
            <button type="button" onClick={onClose} disabled={mutation.isPending} className="px-7 py-3 rounded-full text-[15px] font-semibold text-gray-700 bg-white ring-1 ring-gray-900/10 hover:bg-gray-50 hover:ring-gray-900/20 transition-all duration-300 disabled:opacity-50 shadow-sm">Cancel</button>
            <button type="submit" disabled={mutation.isPending} className="px-8 py-3 rounded-full text-[15px] font-semibold text-white bg-logo-blue hover:bg-blue-800 shadow-[0_4px_14px_rgb(0,71,179,0.2)] hover:shadow-[0_8px_24px_rgb(0,71,179,0.3)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center">
              {mutation.isPending && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
              Launch Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
