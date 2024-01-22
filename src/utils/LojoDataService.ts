import { UserSummary, UserDetail } from "../models/User";
import { UserDetailsUrl } from "../utils/envvars";

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
