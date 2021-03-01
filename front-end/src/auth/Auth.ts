import { History } from 'history';
import { loginUser } from '../api/users-api';


export default class Auth {

    //accessToken: string = '';

    /*constructor(history: History){
        this.history = history

    }*/
    constructor(
        private history: History,
        private accessToken: string = '',
    ){}

    get getAccessToket (){
        return this.accessToken;
    }

    set setAccessToken(token: string){
        this.accessToken = token;
    }

    logout() {

    }

    async handleAuthentication(email: string, password: string) {
        const response = await loginUser({ email, password })

        if(response && response.data){
            
        }

        this.history.replace('/');
    }
}