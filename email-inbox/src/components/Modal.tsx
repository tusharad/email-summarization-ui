import React from 'react';

interface ModalProps {
  summary: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ summary, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-primary p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">Summary</h2>
        <pre id="modal-content" className="text-white">
          {summary || 'Loading...'}
        </pre>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
