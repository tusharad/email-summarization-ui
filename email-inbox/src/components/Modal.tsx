import React from 'react';

interface ModalProps {
  summary: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ summary, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      
    <div className="bg-white p-6 rounded shadow-lg w-2/3 max-h-3/4 overflow-y-auto">
    <button onClick={onClose} className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
        Close
      </button>
      <h2 className="text-2xl font-semibold mb-4">Summary </h2>
      <div className="whitespace-pre-wrap break-words max-h-[500px] max-w-full overflow-y-auto">
        {summary || <h2 className='loading-animation text-center text-blue-500'>Loading summary...</h2> }
      </div>
       
    </div>
  </div>
  );
};

export default Modal;
