import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RootState } from '../reducers'
import { connect, ConnectedProps } from 'react-redux'
import Header from './Header'
import Home from './Home'
import TransactionReports from './TransactionReports'
import LoginPage from './LoginPage'
import AddInvoice from './AddInvoice'
import { renewSession } from '../actions/authedUser'
import { handleInitialData } from '../actions/shared'
import { webSocketEndpoint } from '../config'
import Toast from './Toast'
import { Invoice } from '../types/Invoice'
import { InvoicesActionTypes } from "../actions/invoices/types"
import { addInvoice as addInvoiceActionCreator } from '../actions/invoices'


const toast = new Toast()
let lostConnectionToast: Toast | null = null
type PropsFromRedux = ConnectedProps<typeof connectedApp>
type Props = PropsFromRedux 

function App({ authedUser, renewSession, handleInitialData, addInvoiceActionCreator } : Props) {
  
  const isAuthenticated = authedUser.isLoggedIn
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      //try{
        if(isAuthenticated){
          handleInitialData()
          openSocket(addInvoiceActionCreator)
          setLoading(false)
        }else{
          /*I had to put it inside if else, to avoid renewing the session twice
          When isAuthnticated state changes, this useEffect renders again. more on that here
          https://coder.earth/post/react-hooks-oops-part-2-effect-runs-multiple-times-with-the-same-dependencies/ */
          renewSession().catch(() => {
            setLoading(false)
          })
        }
/*      }catch(err){
        alert(err);
        setLoading(false)
      }*/
    })()
  }, [ renewSession, isAuthenticated, handleInitialData, addInvoiceActionCreator ]);
  //Why i passed renewSession callback here https://stackoverflow.com/questions/58624200/react-hook-useeffect-has-a-missing-dependency-dispatch

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="site-container">
      <Header />
      <div style={{flexGrow: 4}}>
      {!isAuthenticated 
        ? <LoginPage />
        : (<Router >
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
        </Router>)}
      </div>
      <footer> &#169;2016 God's Hand Aluminium Companies, Inc. All rights reserved</footer>
    </div>
  )
}

const mapStateToProps = ({ authedUser }: RootState) => ({ authedUser })

const mapDispatchToProps = {
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