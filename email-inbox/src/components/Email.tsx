import React from 'react';
import { Email as EmailType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faForward, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';

interface EmailProps {
  threadId: number
  indexKey: number;
  email: EmailType;
  onToggle: () => void;
  onReply: (senderEmail: string, threadId: number) => void;
}

const Email: React.FC<EmailProps> = ({indexKey, email, onToggle, threadId, onReply }) => {

  const handleReplyClick = () => {
    onReply(email.senderEmail, threadId);
  };

  return (
    <div className="p-6 border-b bg-white hover:bg-gray-50 transition" onClick={onToggle}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full mr-2"
            src={`./assets/images/${indexKey % 2 === 0 ? 'man2.jpeg' : 'woman1.jpeg'}`}
            alt="Sender"
          />
          <div>
            <p className="font-semibold text-primary">{email.sender}</p>
            <p className="text-sm text-secondary">{email.senderEmail}</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">{email.date}</p>
      </div>
      {email.isOpen ? (
        <pre className="text-gray-900 mt-4 pre-wrap">{email.content}</pre>
      ) : (
        <div className="text-gray-500 truncate">{email.content.substring(0, 100)}...</div>
      )}
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          onClick={handleReplyClick}
        >
          Reply
        </button>
        <div className="flex space-x-4">
          <FontAwesomeIcon icon={faReply} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
          <FontAwesomeIcon icon={faForward} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
          <FontAwesomeIcon icon={faTrash} className="text-gray-500 hover:text-red-500 cursor-pointer" />
          <FontAwesomeIcon icon={faStar} className="text-gray-500 hover:text-yellow-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Email;
