import React, {Component} from 'react'
import {connect} from 'react-redux';  
import { Container, Input, Button } from "reactstrap";
import {getRegisterState} from '../../selectors'
import {register} from '../../actions'
import Spinner from '../Spinner'
import ButterToast, {CinnamonSugar} from 'butter-toast'

export class Register extends Component {
    constructor() {
      super();
      this.state = {
        username: '',
      };
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.registerInfo.err !== this.props.registerInfo.err) {
        const toast = CinnamonSugar.crisp({
          theme: 'error',
          icon: 'exclamation',
          title: <div className="tj">{this.props.registerInfo.err}</div>,
          toastTimeout: 14000,
          dismissOnClick: true,
        })

        ButterToast.raise(toast)
      }
    }

    onChange = (event) => {
        const nickName = event.target.value

        this.setState({username: nickName})
    }

    onRegisterClick = (event) => {
       this.props.register(this.state.username)
    }

    render() {
      const enabledButtonClass = this.state.username && !this.props.registerInfo.loading ? 'btn-success btn-register' : ''

      return (
        <React.Fragment>
          <Container fluid className="centered">
            <div className="layout layout-center transparent-bg">
                <header className="page-title">
                  <div className="h2 fw7 mb2 register-title">Registration</div>
                </header>
                <main className="flex">
                    <Input 
                        value={this.state.username} 
                        placeholder="Username"
                        onChange={this.onChange}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            if (this.state.username)
                              this.onRegisterClick(e)
                          }
                        }}
                        className={this.props.registerInfo.err ? 'is-invalid' : ''}
                    />
                    <Button 
                        disabled={!this.state.username || this.props.registerInfo.loading} 
                        className={'ml-1 ' + enabledButtonClass}
                        onClick={this.onRegisterClick}> 
                        Register 
                    </Button>
                    <Spinner inline size="10" visible={this.props.registerInfo.loading}></Spinner>
                </main>
            </div>
          </Container>
          <ButterToast trayPosition="top-center"/>
         </React.Fragment>
      )
    }
  }

  
const mapStateToProps = state => {
    return {
      registerInfo: getRegisterState(state)
    }
  };
  
//   const mapDispatchToProps = dispatch => {
//     return bindActionCreators({register}, dispatch);
//   };

  export default connect(mapStateToProps, {register})(Register)