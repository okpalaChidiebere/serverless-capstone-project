import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'
import UserPool from './UserPool'

export const cognitoSignIn = (email: any, password: any): Promise<CognitoUserSession> => {
    return new Promise((resolve, reject) => {

        const authenticationData = {
            Username: email,
            Password: password
        }
        const authenticationDetails = new AuthenticationDetails( authenticationData )

        const userData = {
            Username: email,
            Pool: UserPool
        }
        const cognitoUser = new CognitoUser( userData )
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: result => {
                resolve(result)
            },
            onFailure: err => {
                reject(err)
            },
            newPasswordRequired: data => {
                reject(data)
            }
        })
    })
}