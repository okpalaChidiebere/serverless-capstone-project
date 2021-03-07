import { MiddleWare } from './middleware'
import { getExpiryTime } from "../utils/jsonWebToken"
import { refreshToken } from '../api/users-api'
import { setAuthedUser, updateAccessToken } from '../actions/authedUser'
import { UPDATE_ACCESS_TOKEN } from '../actions/authedUser/types'

const checkSession: MiddleWare = (store) => (next) => (action) => {

    const { authedUser } = store.getState()

    if(Date.now() >= authedUser.expiresAt 
    && authedUser.accessToken !== '' 
    && action.type !== UPDATE_ACCESS_TOKEN //to avoid infinite look off or updating the accessToken over and over
    ){
        
        refreshToken()
        .then(({ accessToken }) => {

            let expiresAt = getExpiryTime(accessToken)
            expiresAt = expiresAt * 1000

            store.dispatch(updateAccessToken(accessToken, expiresAt))
            //console.log('new token: ', accessToken)
            return next(action)
        })
        .catch(() => {
            store.dispatch(setAuthedUser({
                accessToken: '',
                user: null,
                isLoggedIn: false,
                expiresAt: 0
            }))
            //console.log("login again")
            return next(action)
        })
        //console.log("getting refresh token")
    }else{
        //console.log("session still valid")
        return next(action)
    }

}

export default checkSession