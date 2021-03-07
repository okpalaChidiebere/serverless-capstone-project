import * as jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { getToken } from '../functions/auth/utils'


export function verifyToken(authHeader: string){
    
    const token = getToken(authHeader)

    return jwt.verify(
        token,
        'tempSecret',
        { algorithms: ['HS256'] }
    ) as User;
}

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
    const decodedJwt = jwt.decode(jwtToken) as User
    return decodedJwt.userId
}

export function createAccessToken(user: User, expiresIn: string = '40s'): string {
    return jwt.sign( user, 'tempSecret', { algorithm: 'HS256', expiresIn });
}

export function createRefreshToken(user: User, expiresIn: string = '7d'): string {
    //The user will use this token only to get a new access token when the current accesstoken expires. 
    return jwt.sign( user, 'tempSecretSeparateFromAccess', { algorithm: 'HS256', expiresIn });
}