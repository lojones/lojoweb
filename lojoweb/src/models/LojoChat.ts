export interface LojoChat {
    chatId: string;
    userId: string;
    summary: string;
    firstName: string;
    remarks: LojoChatRemark[];
  }

export interface LojoChatRemark {
    speaker: string;
    isAiResponse: boolean;
    timestamp: Date;
    remark: string;
}  

export interface LojoChatMetadata {
    chatId: string;
    summary: string;
}