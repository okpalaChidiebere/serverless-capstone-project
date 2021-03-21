import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: "ca-central-1_EHnR4lzII",
    ClientId: "4m6r5t9kgjforta065705d75g0",
}

export default new CognitoUserPool(poolData)