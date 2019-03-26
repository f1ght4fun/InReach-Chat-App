import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Container, Input, Button } from "reactstrap"
import {getChatState} from '../../selectors'
import {sendMessage, getHistory, leave} from '../../actions'
import { animateScroll } from "react-scroll";

const Actions = Object.freeze( 
{
    Joined: 0, 
    Left: 1,
    Said: 2
})

const MessageBuilder = ({idx, message, own}) => {
    switch(message.action)
    {
      case Actions.Joined:
      case Actions.Left:
        return (
          <React.Fragment key={idx}>
            <div key={idx} className="join-left-message">
              <div><p>{`${message.username}${message.text}`}</p></div>
            </div>
          </React.Fragment>
        )
      default:
        const mymsg = own ? 'me' : ''
        return (
          <React.Fragment key={idx}>
            <div key={idx} className={`message ${mymsg}`}>
              <p className="fw7 nickname">{message.username}</p>
              <div><p>{message.text}</p></div>
            </div>
          </React.Fragment>
        )
    }
}

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  componentDidMount = () => {
    this.props.getHistory()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.chat.history.length !== prevProps.chat.history.length) {
      animateScroll.scrollToBottom({
        containerId: "сhatList"
      });
    }
  }


  onChange = (event) => {
      this.setState({message: event.target.value})
  }

  onSend = (event) => {
    this.props.sendMessage(this.state.message)
    this.setState({message: ''})
  }

  onLeave = (event) => {
    this.props.leave()
  }

  render() {
    const enabledButtonClass = this.state.message ? 'btn-success chat-button' : 'chat-button'

    return (
      <Container fluid className="centered">
        <div className="layout layout-center transparent-bg">
            <main className="flex row wrap">
                <div className="chat-container">
                  <div className="chat" id="сhatList">
                    {
                      this.props.chat.history.map((val, idx) => {
                        return <MessageBuilder key={idx} idx={idx} message={val} own={this.props.chat.username === val.username} />
                      })
                    }
                  </div>
                </div>
                <Input className="chat-message"
                    value={this.state.message}
                    onChange={this.onChange}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        if (this.state.message)
                          this.onSend(e)
                      }
                    }}
                />
                <Button 
                    disabled={!this.state.message} 
                    className={enabledButtonClass}
                    onClick={this.onSend}> 
                    Send 
                </Button>
                <Button 
                  className="bg-transparent leave-button"
                  onClick={this.onLeave}> 
                    <i className="fa fa-sign-out"></i>
                </Button>
            </main>
        </div>
      </Container>
    )
  }
}

  
const mapStateToProps = state => {
    return {
      chat: getChatState(state)
    }
  };
  
export default connect(mapStateToProps, {sendMessage, getHistory, leave})(Chat)