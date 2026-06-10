import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

export default function Contact() {
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background-light">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="mb-12 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>

        {/* Page heading */}
        <h1 className="text-5xl sm:text-6xl font-display font-bold italic text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-500 mb-12">
          Got a question, feedback, or just want to say hi? We'd love to hear from you.
        </p>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* First Name + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="input-field bg-gray-100/50"
                placeholder="Aakriti"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="input-field bg-gray-100/50"
                placeholder="Sharma"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-900 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="contactEmail"
              name="email"
              type="email"
              required
              className="input-field bg-gray-100/50"
              placeholder="aakriti@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-900 mb-2">
              Tell us everything! Share your thoughts.
            </label>
            <textarea
              id="contactMessage"
              name="message"
              rows="5"
              maxLength={1000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-2xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-blue sm:text-sm sm:leading-6 resize-none"
              placeholder="I have an idea for a feature..."
            />
            <p className="mt-2 text-right text-xs text-gray-400">
              {message.length}/1000 characters
            </p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary py-3 px-10 text-sm"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit
            </button>
          </div>
        </form>

        {/* Below form */}
        <p className="mt-10 text-center text-sm text-gray-400">
          We typically respond within 24 hours.
        </p>
      </div>
    </div>
  );
}
