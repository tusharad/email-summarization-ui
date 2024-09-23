interface Email {
    sender: string;
    senderEmail: string;
    date: string;
    content: string;
    isOpen: boolean;
  }
  
  interface Thread {
    threadTitle: string;
    emails: Email[];
  }
  
  class EmailApp {
    private emailThreads: Thread[] = [
      {
        threadTitle: "Email Thread 1",
        emails: [
          {
            sender: "John Doe",
            senderEmail: "john.doe@example.com",
            date: "Sept 23, 2024 10:30 AM",
            content: "This is John's first email in the thread. It contains some important details about the project.",
            isOpen: false
          },
          {
            sender: "Jane Smith",
            senderEmail: "jane.smith@example.com",
            date: "Sept 23, 2024 10:45 AM",
            content: "This is Jane's response to John. She provides further insights and asks for clarification.",
            isOpen: false
          },
          {
            sender: "John Doe",
            senderEmail: "john.doe@example.com",
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
            date: "Sept 24, 2024 9:00 AM",
            content: "Alice kicks off the second thread with details on the new product launch.",
            isOpen: false
          },
          {
            sender: "Bob Martin",
            senderEmail: "bob.martin@example.com",
            date: "Sept 24, 2024 9:30 AM",
            content: "Bob responds to Alice with feedback and suggestions for improvement.",
            isOpen: false
          }
        ]
      }
    ];
  
    private currentThreadIndex = 0;
  
    constructor() {
      this.loadEmailThread();
    }
  
    // Function to open the modal
    public openModal(): void {
      document.getElementById('modal')!.classList.remove('hidden');
  
      const thread = this.emailThreads[this.currentThreadIndex];
  
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
  
    // Function to close the modal
    public closeModal(): void {
      document.getElementById('modal')!.classList.add('hidden');
    }
  
    // Load the email thread and display its emails
    private loadEmailThread(threadIndex: number = 0): void {
      this.currentThreadIndex = threadIndex;
      const thread = this.emailThreads[threadIndex];
      const emailContentDiv = document.getElementById("email-content")!;
  
      let threadContent = `
          <div class="p-6 border-b bg-dark" id="thread-title">
              <h1 class="text-2xl font-semibold text-primary">${thread.threadTitle}</h1>
              <p class="text-secondary">Click on any email to view details</p>
          </div>`;
  
      thread.emails.forEach((email, index) => {
        threadContent += `
            <div class="p-6 border-b bg-white cursor-pointer hover:bg-blue-100" id="email-cont" onclick="toggleEmail(${threadIndex}, ${index})">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center">
                        <img class="h-8 w-8 rounded-full mr-2" src="assets/man2.jpeg" alt="Sender Avatar">
                        <span>${email.sender}</span>
                    </div>
                    <div class="text-gray-700 truncate">${email.content.substring(0, 50)}...</div>
                </div>
                ${email.isOpen ? `<div class="text-gray-700 mt-4">${email.content}</div>` : ''}
            </div>`;
      });
  
      emailContentDiv.innerHTML = threadContent;
    }
  
    // Function to toggle the expansion of a specific email in the thread
    public toggleEmail(threadIndex: number, emailIndex: number): void {
      const email = this.emailThreads[threadIndex].emails[emailIndex];
      email.isOpen = !email.isOpen;
  
      this.loadEmailThread(threadIndex);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const app = new EmailApp();
  });