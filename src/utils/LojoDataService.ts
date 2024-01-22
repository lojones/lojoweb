import { UserSummary, UserDetail } from "../models/User";
import { UserDetailsUrl, microsoftLogout } from "../utils/envvars";

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
        const data = await response.json();
        if (response.ok) {
            const userDetail: UserDetail = data;
            console.log(userDetail);
            return userDetail;
        } else {
            throw new Error('Invalid token');
        }
    
    }
}

export const logoutMicrosoft = async (token:string|null, microsoftaccesstoken:string|null): Promise<void> => {
        
    if (!token) {
        throw new Error('Invalid token');
    } else {
        if (microsoftaccesstoken) {
            const response = await fetch(microsoftLogout(), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ accessToken: microsoftaccesstoken })
            });
            
            if (response.ok) {
                console.log("logged out");
                return;
            } else {
                console.log("error logging out");
            }
        }
        
    }
}