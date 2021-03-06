import jwtDecode, { JwtPayload } from "jwt-decode"

export const getExpiryTime = (access_token: string) => {
    const { exp = 0 } = jwtDecode(access_token) as JwtPayload
    return exp
}