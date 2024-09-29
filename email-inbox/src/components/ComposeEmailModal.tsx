// Create a new file: ComposeEmailModal.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface ComposeEmailModalProps {
  onClose: () => void;
  senderEmail2?: string;
  threadId?: number;
  isReply?: boolean;
  onEmailSent: () => void;
}

const ComposeEmailModal: React.FC<ComposeEmailModalProps> = ({ onClose, senderEmail2, threadId, isReply = false,onEmailSent }) => {
  const [senderEmail, setSenderEmail] = useState(senderEmail2);
  const [subject, setSubject] = useState(isReply ? 'Re: ' : '');
  const [content, setContent] = useState('');

  const handleSend = async () => {
    try {
      const url = isReply ? `http://localhost:5000/create/email/${threadId}` : 'http://localhost:5000/create/email';
      await axios.post(url, {
        senderEmail,
        subject,
        content,
      });
      alert(isReply ? 'Reply sent successfully!' : 'Email sent successfully!');
      onEmailSent();
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-10 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold mb-4">{isReply ? 'Reply Email' : 'Compose New Email'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Sender Email</label>
        <input
          type="email"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          disabled={isReply}
        />
      </div>
      {!isReply && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  </div>
  );
};

export default ComposeEmailModal;
