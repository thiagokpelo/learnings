import React, { Component } from 'react'

class InputCustomizado extends Component {

  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input id={this.props.name} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}  />
      </div>
    )
  }
}

export default InputCustomizado
