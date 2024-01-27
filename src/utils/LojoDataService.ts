import { LojoChat } from "../models/LojoChat";
import { UserSummary, UserDetail } from "../models/User";
import { UserDetailsUrl,storeChatUrl } from "../utils/envvars";

export const getUserDetails = async (token:string): Promise<UserDetail> => {
    
    if (!token) {
        throw new Error('Invalid token');
    } else {
    
        const response = await fetch(UserDetailsUrl(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const userDetail: UserDetail = data;
            console.log(userDetail);
            return userDetail;
        } else {
            throw new Error('Invalid token');
        }
    
    }
}

export const storeChat = async (token:string, chat:LojoChat) => {
    if (!token) {
        throw new Error('Invalid token');
    } else {
        const response = await fetch(storeChatUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(chat)
        });
        if (response.ok) {
            console.log('Chat stored');
        } else {
            console.log('Error trying to store chat',response);
        }
    }
}
