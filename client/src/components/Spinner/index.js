import React from 'react'
import 'spinkit/css/spinkit.css'

class Spinner extends React.Component {
  render() {
    const inlineStyle = this.props.inline ? {
      display: 'flex',
      alignSelf: 'center',
      marginLeft: this.props.left ? this.props.left + 'px' : '0px',
      marginRight: this.props.right ? this.props.right + 'px' : '0px',
      marginTop: this.props.top ? this.props.top + 'px' : '0px',
      marginBottom: this.props.bottom ? this.props.bottom + 'px' : '0px',
    } : {}

    const visibleStyle = (this.props.visible === undefined || this.props.visible) ?
      (this.props.inline ? {display: 'inline-block'} : {}) : {display: 'none'}

    const childStyle = {
      height: this.props.size ? this.props.size + 'px' : '20px',
      width: this.props.size ? this.props.size + 'px' : '20px',
    }

    return (
      <div className="sk-three-bounce" style={{...inlineStyle, ...visibleStyle}}>
        <div className="sk-child sk-bounce1" style={childStyle}></div>
        <div className="sk-child sk-bounce2" style={childStyle}></div>
        <div className="sk-child sk-bounce3" style={childStyle}></div>
      </div>
    )
  }
}

export default Spinner
