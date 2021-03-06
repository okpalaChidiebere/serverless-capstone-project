import Cookies from "js-cookie"

export const getRrefreshToken = () => {
 return Cookies.get('jid')
}

export const setRrefreshToken = (refresh_token: string) => {
    Cookies.set("jid", refresh_token, {
        expires: 7, 
        sameSite: 'Strict', 
        //secure: true
    })
}