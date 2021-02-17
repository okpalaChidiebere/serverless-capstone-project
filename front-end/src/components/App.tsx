import React, { Fragment } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Header from './Header'
import Home from './Home'
import NotFoundPage from './NotFoundPage'
import AddInvoice from './AddInvoice'
import TransactionReports from './TransactionReports'
import LoginPage from './LoginPage'

const history = createHistory()


function App() {

  return (
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
  )
}

export default App;
