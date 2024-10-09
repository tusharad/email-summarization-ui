import React, { useState } from 'react';
import { Email as EmailType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faForward, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface EmailProps {
  threadId: number;
  indexKey: number;
  email: EmailType;
  onToggle: () => void;
  onReply: (senderEmail: string, threadId: number) => void;
}

const Email: React.FC<EmailProps> = ({ indexKey, email, onToggle, threadId, onReply }) => {
  const [emailContent, setEmailContent] = useState(email.content);
  const [emailIsResolved, setEmailIsResolved] = useState(email.isResolved);

  const handleReplyClick = () => {
    onReply(email.senderEmail, threadId);
  };

  const handleConfirmSend = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/update/email/${email.emailRecordId}`, {
        content: emailContent,
      });
      alert('Email updated successfully!');
      setEmailIsResolved(true);
      // Handle response or update state as necessary
    } catch (error) {
      console.error('Error updating email:', error);
      alert('Failed to update email.');
    }
  };

  return (
    <div className="p-6 border-b bg-white hover:bg-gray-50 transition">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center cursor-pointer" onClick={onToggle}>
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
        emailIsResolved ? (
          <pre onClick={onToggle} className="text-gray-900 mt-4 pre-wrap">{email.content}</pre>
        ) : (
          <div>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mt-4"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={8} // Increased number of rows
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 mt-2"
              onClick={handleConfirmSend}
            >
              Confirm Send
            </button>
          </div>
        )
      ) : (
        <div onClick={onToggle} className="text-gray-500 truncate">{email.content.substring(0, 100)}...</div>
      )}
      <div className="flex justify-between mt-4">
        {emailIsResolved ? 
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
          onClick={handleReplyClick}
        >
          Reply
        </button> : undefined
        }
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

