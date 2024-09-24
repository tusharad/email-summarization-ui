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

const emailThreads: Thread[] = [
  {
    threadTitle: "Email Thread 1",
    emails: [
      {
        sender: "John Doe",
        senderEmail: "john.doe@example.com",
        fromEmail: "tushar.ad@example.com",
        date: "Sept 23, 2024 10:30 AM",
        content: "This is John's first email in the thread. It contains some important details about the project.",
        isOpen: false
      },
      {
        sender: "Jane Smith",
        senderEmail: "jane.smith@example.com",
        fromEmail: "tushar.ad@example.com",
        date: "Sept 23, 2024 10:45 AM",
        content: "This is Jane's response to John. She provides further insights and asks for clarification.",
        isOpen: false
      },
      {
        sender: "John Doe",
        senderEmail: "john.doe@example.com",
        fromEmail: "tushar.ad@example.com",
        date: "Sept 23, 2024 11:00 AM",
        content: "John replies back to Jane with answers to her questions.",
        isOpen: false
      }
    ]
  },
  {
    threadTitle: "Email Thread 2",
    emails: [
      {
        sender: "Alice Johnson",
        senderEmail: "alice.johnson@example.com",
        fromEmail: "tushar.ad@example.com",
        date: "Sept 24, 2024 9:00 AM",
        content: "Alice kicks off the second thread with details on the new product launch.",
        isOpen: false
      },
      {
        sender: "Bob Martin",
        senderEmail: "bob.martin@example.com",
        fromEmail: "tushar.ad@example.com",
        date: "Sept 24, 2024 9:30 AM",
        content: "Bob responds to Alice with feedback and suggestions for improvement.",
        isOpen: false
      }
    ]
  }
];

const openModal = (): void => {
  document.getElementById('modal')!.classList.remove('hidden');

  const thread = emailThreads[currentThreadIndex];

  fetch('http://localhost:8000/summarize', {
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

document.addEventListener('DOMContentLoaded', () => {
  openEmailThread();
});
