import { MiddleWare } from './middleware'
import { Auth } from 'aws-amplify'
import { setAuthedUser, updateAccessToken } from '../actions/authedUser'
import { UPDATE_ACCESS_TOKEN } from '../actions/authedUser/types'

const checkSession: MiddleWare = (store) => (next) => (action) => {

    const { authedUser } = store.getState()

    if(Date.now() >= authedUser.expiresAt 
    && authedUser.accessToken !== '' 
    && action.type !== UPDATE_ACCESS_TOKEN //to avoid infinite look off or updating the accessToken over and over
    ){
        //more on this method here https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#retrieve-current-session
        //https://haverchuck.github.io/docs/js/authentication
        Auth.currentSession()
        .then((data) => {

            const id_token = data.getIdToken().getJwtToken()
            const expiresAt = data.getIdToken().getExpiration() * 1000
            store.dispatch(updateAccessToken(id_token, expiresAt))
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