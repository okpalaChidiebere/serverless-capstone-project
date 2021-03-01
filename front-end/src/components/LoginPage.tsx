import React from 'react'
import serializeForm from 'form-serialize'
import { loginUser } from '../api/users-api'


const LoginPage: React.FC = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const formValues = serializeForm(e.currentTarget, { hash: true })
        console.log(formValues)

        const { email, password } = formValues
        try{
            const response = await loginUser({ email, password })
            console.log(response)
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

export default LoginPage