export interface Email {
    seq_no: number;
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
  