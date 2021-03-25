import { apiEndpoint } from '../config';
import { User } from '../types/User';
import { LoginUserRequest } from '../types/LoginUserRequest';
import Axios from 'axios';
import { getRrefreshToken } from "../utils/tokens"


export const getUsers = async (idToken: string): Promise<User[]> => {
    console.log('Fetching users')
  
    const response = await Axios.get(`${apiEndpoint}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
    });
    //console.log('Users:', response.data);
    const { body } = response.data
    return JSON.parse(body).items;
}

export const loginUser = async (credentials: LoginUserRequest) => {
    const response = await Axios.post(`${apiEndpoint}/login`,  JSON.stringify(credentials), {
        headers: {
          'Content-Type': 'application/json',
        },
        //withCredentials: true
    });
    return response.data.body;
}

export const refreshToken = async () => {
    const refreshToken = getRrefreshToken()

    if (!refreshToken) throw new Error("No RefreshToken has expired.Please LogIn")

    const response = await Axios.post(`${apiEndpoint}/refresh_token`, JSON.stringify({ refresh_token: refreshToken }),{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //console.log('token:', response.data);
    return response.data;
}