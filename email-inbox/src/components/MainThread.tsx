import React from 'react';
import { Thread } from '../types';
import Email from './Email.tsx';

interface MainThreadProps {
  thread: Thread;
  onSummarize: (thread_id: number) => void;
  onToggleEmail: (threadIndex: number, emailIndex: number) => void;
  currentThreadIndex : number
}

const MainThread: React.FC<MainThreadProps> = ({ thread, onSummarize, onToggleEmail,currentThreadIndex }) => {
  return (
    <div className="w-full px-6 py-6 mx-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full max-w-full px-3 mb-6">
          <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
            <div className="h-full overflow-y-auto" id="main-thread">
              {/* Button to trigger modal */}
              <div className="absolute top-4 right-4">
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
                  onClick={() => onSummarize(thread.threadId)}
                >
                  Summarize
                </button>
              </div>
              <div id="email-content" className="p-6 bg-white">
                <div className="p-6 border-b bg-dark" id="thread-title">
                  <h1 className="text-2xl font-semibold text-primary">{thread.threadTitle}</h1>
                </div>
                {thread.emails.map((email, index) => (
                  <Email
                    indexKey={index}
                    email={email}
                    onToggle={() => onToggleEmail(currentThreadIndex, index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainThread;
