import React from 'react';
import { Thread } from '../types';

interface SidebarProps {
  emailThreads: Thread[];
  onSelectThread: (index: number) => void;
  currentThreadIndex: number;
}

const Sidebar: React.FC<SidebarProps> = ({ emailThreads, onSelectThread, currentThreadIndex }) => {
  return (
    <aside className="w-96 bg-white border-r shadow-xl max-w-sm overflow-y-auto">
      <div className="h-19 bg-primary">
        <a className="block px-8 py-6 text-2xl text-white" href="/">
          <span className="ml-2 font-semibold">Inbox</span>
        </a>
      </div>
      <hr className="h-px mt-0 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      <ul id="email-sidebar" className="flex flex-col p-4 space-y-2">
        {emailThreads.map((thread, index) => {
          const truncatedContent = thread.emails.length > 0
            ? thread.emails[0].content.substring(0, 50) + '...'
            : 'No content available';

          return (
            <li key={index} className="w-full">
              <div
                className={`py-2.7 text-sm my-0 mx-0 flex items-center hover:bg-blue-800 hover:text-white rounded-lg px-4 font-semibold text-slate-700 cursor-pointer transition-colors ${
                  currentThreadIndex === index ? 'bg-blue-500/13' : ''
                }`}
                onClick={() => onSelectThread(index)}
              >
                <img
                  className="h-10 w-10 rounded-full mr-4"
                  src={`./assets/images/${index % 2 === 0 ? 'woman1.jpeg' : 'man2.jpeg'}`}
                  alt="Sender"
                />
                <div className="flex-1">
                  <div className="font-semibold">{thread.threadTitle}</div>
                  <div className="text-gray-400 text-sm truncate">{truncatedContent}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
