import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';


const mapStateToProps = ({ chat }) => {
  return {
    user: chat.username,
  };
};

class ProtectedRoute extends Component {
  render() {
    const {user, ...rest} = this.props
      if (!user) {
        return <Redirect to="/register" />
      }
      return <Route {...rest} />
  }
}

export default connect(
  mapStateToProps,
)(ProtectedRoute);