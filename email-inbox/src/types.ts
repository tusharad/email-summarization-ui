export interface Email {
    sender: string;
    senderEmail: string;
    date: string;
    content: string;
    isOpen: boolean;
  }
  
  export interface Thread {
    threadTitle: string;
    emails: Email[];
  }
  