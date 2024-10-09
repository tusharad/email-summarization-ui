export interface Email {
    seq_no: number;
    sender: string;
    senderEmail: string;
    date: string;
    content: string;
    isOpen: boolean;
    isResolved: boolean;
    emailRecordId: number;
  }
  
  export interface Thread {
    threadId: number;
    threadTitle: string;
    emails: Email[];
    sentiment: string;
  }
  
