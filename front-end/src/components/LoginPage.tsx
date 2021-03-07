import React from 'react'
import serializeForm from 'form-serialize'
import { loginUser } from '../api/users-api'
import { connect, ConnectedProps } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { RootState } from '../reducers'
//import { useHistory } from 'react-router-dom'
import { setRrefreshToken } from "../utils/tokens"
import { getExpiryTime } from "../utils/jsonWebToken"


type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  //Where i can add other props its needs other than store and dispatch from redux
}

const LoginPage: React.FC<Props> = (props) => {

    const { setAuthedUser } = props
    //const history = useHistory();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const formValues = serializeForm(e.currentTarget, { hash: true })
        console.log(formValues)

        const { email, password } = formValues
        try{
            const response = await loginUser({ email, password })
            console.log(response)

            const { access_token, user, refresh_token } = response
            const exp = getExpiryTime(access_token)

            let expiresAt = exp * 1000

            setAuthedUser({
                accessToken: access_token,
                user,
                isLoggedIn: Date.now() < expiresAt,
                expiresAt
            })

            setRrefreshToken(refresh_token)
            //const directTo = location.state as { redirectTo: string} 
            //console.log(directTo)
            //history.replace(directTo.redirectTo)
            //history.goBack()
        }catch(err){
            alert(err);
        }
    }

    return(
        <div className="login-page">
           <form className="login-container" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <div>
                    <span>Email: </span>
                    <input type="text" name="email" className="txtBox" style={{width:'150px'}}></input>
                </div>
                <div>
                    <span>Password: </span>
                    <input type="password" name="password" className="txtBox" style={{width:'150px'}}></input>
                </div>
                <div>
                <button>Subnit</button>
                </div>
           </form>
        </div>
    )
}

//I really did not use this slice of store
const mapStateToProps = ({ authedUser }: RootState) => ({
    authedUser
})
  
const mapDispatchToProps = {
    setAuthedUser
}
  
const connector = connect(mapStateToProps , mapDispatchToProps)
  
export default connector(LoginPage)