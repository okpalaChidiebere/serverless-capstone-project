import React from 'react'
import serializeForm from 'form-serialize'
import { connect, ConnectedProps } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { RootState } from '../reducers'
//import { useHistory } from 'react-router-dom'
import { setRrefreshToken } from "../utils/tokens"
import { cognitoSignIn } from '../auth/Auth'


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
        //console.log(formValues)

        const { email, password } = formValues
        try{
            const response = await cognitoSignIn( email, password )
            const id_token = response.getIdToken().getJwtToken()
            //const access_token = response.getAccessToken().getJwtToken()
            const refresh_token = response.getRefreshToken().getToken()
            const isLoggedIn = response.isValid()
            const expiresAt = response.getAccessToken().getExpiration() * 1000
            const full_name = response.getIdToken().decodePayload().name

            console.log(full_name)
            console.log(id_token)

            setAuthedUser({
                accessToken: id_token,
                user: {
                    full_name,
                    store: "Random default store name" //i will have to add this as a custom attribute for sign up using cognito
                } ,
                isLoggedIn,
                expiresAt
            })

            setRrefreshToken(refresh_token)
            //const directTo = location.state as { redirectTo: string} 
            //console.log(directTo)
            //history.replace(directTo.redirectTo)
            //history.goBack()
        }catch(err){
            alert(err);
            console.error("SignIn Error:", err)
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