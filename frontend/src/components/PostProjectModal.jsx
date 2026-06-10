import { X } from 'lucide-react';

export default function PostProjectModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-card w-full max-w-2xl shadow-xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-display font-bold text-gray-900">Post a Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Project Title</label>
            <input type="text" className="input-field" placeholder="E.g., TriSangum Labs Core" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
            <textarea className="w-full rounded-2xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-blue" rows="4" placeholder="What are you building?"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Project Type</label>
              <select className="input-field">
                <option>Open Source</option>
                <option>Closed / Stealth</option>
                <option>Hiring / Paid</option>
                <option>Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
              <select className="input-field">
                <option>Software</option>
                <option>Hardware</option>
                <option>Machine Learning</option>
                <option>Mobile App</option>
                <option>DevTools</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Tech Stack (comma separated)</label>
            <input type="text" className="input-field" placeholder="React, Tailwind, Node.js" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">What kind of help do you need?</label>
            <input type="text" className="input-field" placeholder="UI Designer, Postgres Expert" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">City (Optional)</label>
              <input type="text" className="input-field" placeholder="Bangalore" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">College (Optional)</label>
              <input type="text" className="input-field" placeholder="IIT Madras" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Repository URL (Optional)</label>
            <input type="url" className="input-field" placeholder="https://github.com/..." />
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Post Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}
