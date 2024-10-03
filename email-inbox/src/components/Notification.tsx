import React from 'react';

interface ModalProps {
  message : string;
  onClose: () => void;
}

const Notification: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
     <div className="notification">
      {message}
      <button onClick={onClose}>X</button>
    </div>
    );
};

export default Notification;
