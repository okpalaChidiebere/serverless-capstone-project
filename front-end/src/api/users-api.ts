import { apiEndpoint } from '../config';
import { User } from '../types/User';
import Axios from 'axios';


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
