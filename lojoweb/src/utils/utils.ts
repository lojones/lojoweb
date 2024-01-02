import { LojoChat, LojoChatRemark, LojoChatMetadata } from "../models/LojoChat";
import { v4 as uuidv4 } from 'uuid';

export function formatName(name: string) {
    return name.trim().toUpperCase();
  }

export function getChatHistoryList() : LojoChatMetadata[] {
    console.log("utils: getChatHistoryList ");
    const chatMetadataList: LojoChatMetadata[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith('lojo-chat')) {
        const item = localStorage.getItem(key);
        
        if (item) {
          const chat: LojoChat = JSON.parse(item);
          chatMetadataList.push({ chatId: chat.chatId, summary: chat.summary, timestamp: new Date(chat.timestamp) });
        }
      }
    }
    chatMetadataList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return chatMetadataList;
  }
  

export function getChat(chatId: string) : LojoChat {
    console.log("utils: getChat: for ",chatId);
    if (!chatId.startsWith('lojo-chat') || chatId==""){
      throw new Error('Invalid chatId');
    }
    if (!localStorage.getItem(chatId)) {
      return { chatId: chatId, userId: "", summary: "New chat", firstName: "", timestamp: new Date(), remarks: [] };
    }
    const chatstring : string|null = localStorage.getItem(chatId);
    const chat : LojoChat = JSON.parse(chatstring || "[]") as LojoChat;
    return chat; 
  }

export function saveChat(chat: LojoChat) {
    console.log("utils: saveChat: for " + chat.chatId + " saving ", chat);
    const chatId : string = chat.chatId;
    localStorage.setItem(chatId, JSON.stringify(chat));
  }

export function getNewChatId() : string {
    const uuid = uuidv4();
    const newChatId = `lojo-chat-${uuid}`;
    return newChatId;
  }