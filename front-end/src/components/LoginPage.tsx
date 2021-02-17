import React from 'react'

const LoginPage: React.FC = () => {

    return(
        <div className="login-page">
           <form className="login-container">
                <h1>Sign In</h1>
                <div>
                    <span>Sales Number: </span>
                    <input type="text" name="salesNum" className="txtBox" style={{width:'150px'}}></input>
                </div>
                <div>
                    <span>Password: </span>
                    <input type="text" name="password" className="txtBox" style={{width:'150px'}}></input>
                </div>
                <div>
                <input type="button" value="Submit" />
                </div>
           </form>
        </div>
    )
}

export default LoginPage