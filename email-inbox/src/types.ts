export interface Email {
    sender: string;
    senderEmail: string;
    date: string;
    content: string;
    isOpen: boolean;
  }
  
  export interface Thread {
    threadId: number;
    threadTitle: string;
    emails: Email[];
  }
  