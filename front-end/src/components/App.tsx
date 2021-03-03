import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RootState } from '../reducers'
import { connect, ConnectedProps } from 'react-redux'
import Header from './Header'
import Home from './Home'
import TransactionReports from './TransactionReports'
import LoginPage from './LoginPage'
import AddInvoice from './AddInvoice'


type PropsFromRedux = ConnectedProps<typeof connectedApp>
type Props = PropsFromRedux 

function App({ authedUser } : Props) {
  
  const isAuthenticated = authedUser.isLoggedIn

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
              }}
              component={Home} />
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
  
const connectedApp = connect(mapStateToProps)

export default connectedApp(App)