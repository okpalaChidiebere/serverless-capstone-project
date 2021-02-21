/**
 * A payload of a JWT token
 * 
 * We did not this interface anywhere to cast but this is what the token looks like
 */
export interface JwtPayload {
    userId: string;
    tokenVersion: number;
    iat: number;
    exp: number;
}