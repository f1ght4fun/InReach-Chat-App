import './App.css'

import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from '../src/components/ProtectedRoute';
import Register from '../src/components/Register/Register'
import Chat from '../src/components/Chat/Chat'


const App = ({ history }) => {
  return (
    
    <ConnectedRouter history={history}>
        <Switch>
          <Route path="/register" name="register" component={Register} />
          <ProtectedRoute path="/chat" name="chat" component={Chat} />
          <Redirect from="/" to="/register" />
        </Switch>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App