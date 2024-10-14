import React, { useState } from 'react';
import axios from 'axios';

interface ComposeEmailModalProps {
  onClose: () => void;
  senderEmail2?: string;
  threadId?: number;
  isReply?: boolean;
  onEmailSent: () => void;
}

const ComposeEmailModal: React.FC<ComposeEmailModalProps> = ({
  onClose,
  senderEmail2,
  threadId,
  isReply = false,
  onEmailSent,
}) => {
  const [senderEmail, setSenderEmail] = useState(senderEmail2);
  const [subject, setSubject] = useState(isReply ? 'Re: ' : '');
  const [content, setContent] = useState('');
  const [isMaximized, setIsMaximized] = useState(true);

  const handleSend = async () => {
    try {
      const url = isReply
        ? `http://localhost:5000/create/email/${threadId}`
        : 'http://localhost:5000/create/email';
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

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div
        className={`bg-white p-10 rounded-lg shadow-lg ${
          isMaximized ? 'w-9/12 h-9/12' : 'w-96'
        }`}
        style={{
          transition: 'width 0.3s, height 0.3s',
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {isReply ? 'Reply Email' : 'New Email'}
          </h2>
          <div className="flex space-x-2">
            <button onClick={toggleMaximize} className="text-gray-700">
              {isMaximized ? '► ◄' : '◄ ►'}
            </button>
            <button onClick={onClose} className="text-gray-700">
              ⤫
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">From</label>
          <input
            type="email"
            className="mt-1 px-2 py-2 block w-full border border-gray-400 rounded-md shadow-lg focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 px-2 py-2 block w-full border border-gray-400 rounded-md shadow-lg focus:ring-blue-500 focus:border-blue-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mail body</label>
          <textarea
            className="mt-1 px-2 block w-full border border-gray-400 rounded-md shadow-lg focus:ring-blue-500 focus:border-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
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
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-800"
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
