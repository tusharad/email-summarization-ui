import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import MainThread from './components/MainThread.tsx';
import Modal from './components/Modal.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import axios from 'axios';
import { Thread } from './types';

const App: React.FC = () => {
  const [emailThreads, setEmailThreads] = useState<Thread[]>([]);
  const [currentThreadIndex, setCurrentThreadIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchEmailThreads();
  }, []);

  const fetchEmailThreads = async () => {
    try {
      const response = await axios.get<Thread[]>('http://localhost:5000/all_email_threads');
      setEmailThreads(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching email threads:', err);
      setError('Failed to load email threads. Please try again later.');
      setIsLoading(false);
    }
  };

  const openModal = async (threadId: number) => {
    setIsModalOpen(true);

    try {
      const response = await axios.post<{summary: string}>(
        `http://localhost:5000/summarize/${threadId}`
      );
      console.log("got data: ",summary)
      setSummary(response.data.summary);
    } catch (err) {
      console.error('Error:', err);
      setSummary('An error occurred. Please try again.');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleThreadSelect = (index: number) => {
    setCurrentThreadIndex(index);
  };

  const toggleEmailOpen = (threadIndex: number, emailIndex: number) => {
    const updatedThreads = [...emailThreads];
    const email = updatedThreads[threadIndex].emails[emailIndex];
    email.isOpen = !email.isOpen;
    setEmailThreads(updatedThreads);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-slate-500">
      <Sidebar
        emailThreads={emailThreads}
        onSelectThread={handleThreadSelect}
        currentThreadIndex={currentThreadIndex}
      />
      <main className="flex-1 relative overflow-auto">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <MainThread
            thread={emailThreads[currentThreadIndex]}
            onSummarize={openModal}
            onToggleEmail={toggleEmailOpen}
            currentThreadIndex={currentThreadIndex}
          />
        )}
      </main>
      {isModalOpen && (
        <Modal summary={summary} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
