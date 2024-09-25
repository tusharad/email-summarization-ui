import React from 'react';
import { Email as EmailType } from '../types';

interface EmailProps {
  indexKey: number;
  email: EmailType;
  onToggle: () => void;
}

const Email: React.FC<EmailProps> = ({indexKey, email, onToggle }) => {
  return (
    <div
      className="p-6 border-b bg-white cursor-pointer hover:bg-blue-100"
      onClick={onToggle}
    >
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
        <pre className="text-gray-900 mt-4">{email.content}</pre>
      ) : (
        <div className="text-gray-500 truncate">{email.content.substring(0, 100)}...</div>
      )}
    </div>
  );
};

export default Email;
