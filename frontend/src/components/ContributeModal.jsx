import { useState } from 'react';
import { X } from 'lucide-react';

export default function ContributeModal({ isOpen, onClose, projectTitle }) {
  const [message, setMessage] = useState('');

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
        
        <form className="p-6">
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
            <button type="submit" className="btn-primary">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}
