export interface LojoChat {
    chatId: string;
    userId: string;
    firstName: string;
    remarks?: LojoChatRemark[];
  }

export interface LojoChatRemark {
    speaker: string;
    isAiResponse: boolean;
    timestamp: Date;
    remark: string;
}  

