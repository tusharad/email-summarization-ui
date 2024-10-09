import React from 'react';
import { Thread } from '../types';

interface SidebarProps {
  emailThreads: Thread[];
  onSelectThread: (index: number) => void;
  currentThreadIndex: number;
  onComposeNewEmail: () => void;
}

function sentimentImagePath(sentiment: string): string {
  switch(sentiment) {
    case 'neutral': return `./assets/images/${sentiment}.png`
    case 'critical': return `./assets/images/${sentiment}.png`
    case 'needs_attention': return `./assets/images/${sentiment}.png`
    case 'positive': return `./assets/images/woman1.jpeg`
    default: return `./assets/images/woman1.jpeg` // Something went wrong with sentiment response
  }
}

function truncateDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  if (minutes.length < 2) {
    minutes = '0' + minutes;
  }
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 hours to 12
  const time = `${hours}:${minutes} ${period}`;

  return `${day}, ${time}`;
}

const Sidebar: React.FC<SidebarProps> = ({ emailThreads, onSelectThread, currentThreadIndex, onComposeNewEmail }) => {
  return (
    <aside className="w-3/4 bg-white border-r shadow-xl max-w-md overflow-y-auto">
      <div className="relative h-19 bg-primary">
        <div className="block px-8 py-6 text-xl text-white">
          <span className="ml-2 font-semibold">Inbox</span>
        </div>
        <div className="absolute top-5 end-10 text-sm">
            <button
              className="flex-auto bg-white text-red-500 px-4 py-2 rounded-lg shadow hover:bg-gray-300"
              onClick={onComposeNewEmail}
            >
              New message
            </button>
          </div>
      </div>
      <hr className="h-px mt-0 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      <ul id="email-sidebar" className="flex flex-col p-4 space-y-2">
        {emailThreads.map((thread, index) => {
          const truncatedContent = thread.emails.length > 0
            ? thread.emails[0].content.substring(0, 33) + '...'
            : 'No content available';

          const timeOfEmail = thread.emails.length > 0
            ? truncateDateTime(thread.emails[0].date)
            : 'Tue, 8:00 PM';


          return (
            <li key={index} className="w-full">
              <div
                className={`py-2.7 text-sm my-0 mx-0 flex items-center hover:bg-blue-800 hover:text-white rounded-lg px-4 font-semibold text-slate-700 cursor-pointer transition-colors ${currentThreadIndex === index ? 'bg-blue-500/13' : ''
                  }`}
                onClick={() => onSelectThread(index)}
              >
                <img
                  className="h-10 w-10 rounded-full mr-4"
                  src={sentimentImagePath(thread.sentiment)}
                  alt="Sender"
                />
                <div className="flex-1">
                  <div className="font-semibold">{thread.threadTitle}  ({thread.emails.length})</div>
                  <div className="text-gray-400 text-sm truncate">{truncatedContent}</div>
                </div>
                <p className='text-sm text-gray-400 ml-auto'>{timeOfEmail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
