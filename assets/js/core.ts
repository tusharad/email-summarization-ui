interface Email {
  sender: string;
  senderEmail: string;
  fromEmail: string;
  date: string;
  content: string;
  isOpen: boolean;
}

interface Thread {
  threadTitle: string;
  emails: Email[];
}

let currentThreadIndex = 0;

const threadTitleSectionHTML = (threadTitle: string): string => {
  return `<div class="p-6 border-b bg-dark" id="thread-title">
      <h1 class="text-2xl font-semibold text-primary">${threadTitle}</h1>
      <p class="text-secondary">Click on any email to view details</p>
  </div>`
}

const threadEmailSectionHTML = (
  threadIndex: number
  , index: number
  , senderName: string
  , senderEmail: string
  , emailDate: string
  , emailContent: string
  , isOpen: boolean): string => {
  return `<div class="p-6 border-b bg-white cursor-pointer hover:bg-blue-100" id="email-cont" onclick="toggleEmail(${threadIndex}, ${index})">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center">
                        <img class="h-8 w-8 rounded-full mr-2" src="assets/images/man2.jpeg" alt="Sender Image">
                        <div>
                            <p class="font-semibold text-primary">${senderName}</p>
                            <p class="text-sm text-secondary">${senderEmail}</p>
                        </div>
                    </div>
                    <p class="text-sm text-gray-400">${emailDate}</p>
                </div>
                ${isOpen ? `<div class="text-gray-900 mt-4">${emailContent}</div>` : `<div class="text-gray-500 truncate">${emailContent.substring(0, 100)}...</div>`}
            </div>`
}

let emailThreads: Thread[] = [];

const openModal = (): void => {
  document.getElementById('modal')!.classList.remove('hidden');

  const thread = emailThreads[currentThreadIndex];

  fetch('http://localhost:5000/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(thread)
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('modal-content')!.textContent = data.summary;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('modal-content')!.textContent = 'An error occurred. Please try again.';
    });
}

const closeModal = (): void => { document.getElementById('modal')!.classList.add('hidden'); }

const openEmailThread = (threadIndex: number = 0): void => {
  console.log("hello")
  currentThreadIndex = threadIndex;
  const thread = emailThreads[threadIndex];
  const emailContentDiv = document.getElementById("email-content")!;

  let threadContent = threadTitleSectionHTML(thread.threadTitle);

  thread.emails.forEach((email, index) => {
    threadContent += threadEmailSectionHTML(threadIndex, index, email.sender, email.senderEmail, email.date, email.content, email.isOpen);
  });

  emailContentDiv.innerHTML = threadContent;
}

// Function to toggle the expansion of a specific email in the thread
const toggleEmail = (threadIndex: number, emailIndex: number): void => {
  const email = emailThreads[threadIndex].emails[emailIndex];
  email.isOpen = !email.isOpen;
  openEmailThread(threadIndex);
}

const generateSidebarHTML = (): void => {
  const sidebar = document.getElementById('email-sidebar')!;
  sidebar.innerHTML = '';  // Clear the existing content

  emailThreads.forEach((thread, index) => {
    const truncatedContent = thread.emails.length > 0 ? thread.emails[0].content.substring(0, 50) + '...' : 'No content available';
    const sidebarItemHTML = `
      <li class="mt-0.5 w-full">
        <div
          class="py-2.7 bg-blue-500/13 text-sm ease-nav-brand my-0 mx-0 flex items-center hover:bg-blue-800 hover:text-white whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors"
          onclick="openEmailThread(${index})">
          <img class="h-10 w-10 rounded-full mr-4" src="assets/images/woman1.jpeg" alt="Sender Image">
          <div class="flex-1">
            <div class="font-semibold">${thread.threadTitle}</div>
            <div class="text-gray-400 text-sm truncate">${truncatedContent}</div>
          </div>
        </div>
      </li>
    `;
    sidebar.innerHTML += sidebarItemHTML;
  });
};

const fetchEmailThreads = (): void => {
  fetch('http://localhost:5000/all_email_threads')
    .then(response => response.json())
    .then(data => {
      emailThreads = data; // Set the fetched email threads
      openEmailThread();   // Open the first email thread by default
      generateSidebarHTML();
      document.getElementById('loading-spinner')!.classList.add('hidden');
      document.getElementById('email-content')!.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error fetching email threads:', error);
      // Hide the spinner and show an error message
      document.getElementById('loading-spinner')!.classList.add('hidden');
      document.getElementById('email-content')!.innerHTML = 'Failed to load email threads. Please try again later.';
      document.getElementById('email-content')!.classList.remove('hidden');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchEmailThreads();
});
