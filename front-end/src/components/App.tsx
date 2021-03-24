import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RootState } from '../reducers'
import { connect, ConnectedProps } from 'react-redux'
import Header from './Header'
import Home from './Home'
import TransactionReports from './TransactionReports'
import LoginPage from './LoginPage'
import AddInvoice from './AddInvoice'
import { renewSession, setAuthedUser } from '../actions/authedUser'
import { handleInitialData } from '../actions/shared'
import { webSocketEndpoint } from '../config'
import Toast from './Toast'
import { Invoice } from '../types/Invoice'
import { InvoicesActionTypes } from "../actions/invoices/types"
import { addInvoice as addInvoiceActionCreator } from '../actions/invoices'
import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports'
import { AmplifySignUp, AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { CognitoUserSession } from 'amazon-cognito-identity-js'


Amplify.configure(awsconfig)
const toast = new Toast()
let lostConnectionToast: Toast | null = null
type PropsFromRedux = ConnectedProps<typeof connectedApp>
type Props = PropsFromRedux 

function App({ authedUser, renewSession, handleInitialData, addInvoiceActionCreator, setAuthedUser } : Props) {
  
  const isAuthenticated = authedUser.isLoggedIn
  //const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = React.useState<AuthState>()


  useEffect(() => {
    return onAuthUIStateChange(async (nextAuthState, authData) => {
      setAuthState(nextAuthState)
      console.log(authData)
      if(authData){
        const { attributes, signInUserSession } = authData as any
        const response = signInUserSession as CognitoUserSession

        const isLoggedIn = response.isValid()
        const full_name = attributes.name
        const id_token = response.getIdToken().getJwtToken()
        const expiresAt = response.getIdToken().getExpiration() * 1000


        setAuthedUser({
          accessToken: id_token,
          user: {
              full_name,
              store: "Random default store name" //i will have to add this as a custom attribute for sign up using cognito
          } ,
          isLoggedIn,
          expiresAt
        })
        handleInitialData()
        openSocket(addInvoiceActionCreator)
      }
          //setLoading(false)
      
    })
  }, [ handleInitialData, addInvoiceActionCreator, setAuthedUser ])
  //Why i passed renewSession callback here https://stackoverflow.com/questions/58624200/react-hook-useeffect-has-a-missing-dependency-dispatch

  /*if (loading) {
    return <div>loading...</div>;
  }*/

  return authState === AuthState.SignedIn && isAuthenticated ? (
    <div className="site-container">
      <Header />
      <div style={{flexGrow: 4}}>
      <Router >
          <Suspense fallback={<p>Loading</p>}>
          <Switch>
              <Route 
              path='/' 
              exact
              render={props => {
                return <Home {...props}/>
              }}/>
              <Route 
              path='/transactionReports' 
              exact 
              render={props => {
                return <TransactionReports {...props}/>
              }}/>
              <Route path='/invoice/add' exact component={AddInvoice} />
              <Route component={lazy(() => import("./NotFoundPage"))} />
          </Switch>
          </Suspense>
        </Router>)
      </div>
      <footer> &#169;2016 God's Hand Aluminium Companies, Inc. All rights reserved</footer>
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          {
            type: "username",
            label: "Username",
            placeholder: "username",
            required: true,
          },
          {
            type: "email",
            label: "Email",
            placeholder: "email",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "password",
            required: true,
          },
          {
            type: "name",
            label: "Name",
            placeholder: "Full name",
            required: true,
          },
        ]}
      />
    </AmplifyAuthenticator>
  )
}

const mapStateToProps = ({ authedUser }: RootState) => ({ authedUser })

const mapDispatchToProps = {
  setAuthedUser,
  renewSession,
  handleInitialData,
  addInvoiceActionCreator,
}
  
const connectedApp = connect(mapStateToProps, mapDispatchToProps)

export default connectedApp(App)

const openSocket = (dispatch: (invoice: Invoice) => InvoicesActionTypes) => {
  const socketUrl = webSocketEndpoint
  const ws = new WebSocket(socketUrl)

  ws.addEventListener('open', () => {
    
    if (lostConnectionToast) {
      lostConnectionToast.hide()
    }
  })

  ws.addEventListener('message', (event) => {
    //requestAnimationFrame(() => {
      onSocketMessage(dispatch, event.data)
    //})
  })

  ws.addEventListener('close', () => {
    // tell the user
    lostConnectionToast = toast
    lostConnectionToast.show("Unable to connect. Retrying…")

    // try and reconnect in 5 seconds
    setTimeout(() => {
      openSocket(dispatch)
    }, 5000)
  })
}

// called when the web socket sends message data
const onSocketMessage = (dispatch: (invoice: Invoice) => InvoicesActionTypes, data: any) => {
  const messages = JSON.parse(data) as Invoice

  //console.log('WebSockets: ', messages)
  //update the invoice store slice with the new invoice returned
  if(messages.salesPerson !== 'Okpala Chidiebere')
    dispatch(messages)

}