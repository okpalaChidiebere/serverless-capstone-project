import React, { Fragment } from 'react'
import { Router, Route, Switch, useHistory } from 'react-router-dom'
//import createHistory from 'history/createBrowserHistory'
import Header from './Header'
import Home from './Home'
import NotFoundPage from './NotFoundPage'
import AddInvoice from './AddInvoice'
import TransactionReports from './TransactionReports'
import LoginPage from './LoginPage'




function App() {
  const history = useHistory()
  return (
    <div className="site-container">
      <LoginPage />
    </div>
  )
}

export default App;


/**
<Router history={history}>
      <Fragment>
        <div className="site-container">
          <Header />
          <div style={{flexGrow: 4}}>
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
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <footer> &#169;2016 God's Hand Aluminium Companies, Inc. All rights reserved</footer>
        </div>
      </Fragment>
    </Router>
 */
