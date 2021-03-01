import { apiEndpoint } from '../config';
import { User } from '../types/User';
import { LoginUserRequest } from '../types/LoginUserRequest';
import Axios from 'axios';

export const getUsers = async (idToken: string): Promise<User[]> => {
    console.log('Fetching users')
  
    const response = await Axios.get(`${apiEndpoint}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
    });
    console.log('Users:', response.data);
    const { items } = response.data
    return items;
}

export const loginUser = async (credentials: LoginUserRequest) => {
    const response = await Axios.post(`${apiEndpoint}/login`,  JSON.stringify(credentials), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return response.data.body;
}

export const refreshToken = async () => {
    const response = await Axios.post(`${apiEndpoint}/refresh_token`, { withCredentials: true });
    console.log('token:', response.data);
    const { accessToken } = response.data
    return accessToken;
    //return response.data.body;
}