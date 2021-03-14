import * as jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { getToken } from '../functions/auth/utils'


//used by requireAuth Lambda
export function verifyToken(authHeader: string, accessSecretKey: string){
    
    const token = getToken(authHeader)

    return jwt.verify(
        token,
        accessSecretKey,
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

export function createAccessToken(user: User, accessSecretKey: string, expiresIn: string = '20m'): string {
    return jwt.sign( user, accessSecretKey, { algorithm: 'HS256', expiresIn });
}

export function createRefreshToken(user: User, refreshSecretKey: string, expiresIn: string = '7d'): string {
    //The user will use this token only to get a new access token when the current accesstoken expires. 
    return jwt.sign( user, refreshSecretKey, { algorithm: 'HS256', expiresIn });
}