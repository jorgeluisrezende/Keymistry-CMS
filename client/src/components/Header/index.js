import React, { Component } from 'react'

export default class index extends Component {

  renderMainButton() {
    if(this.props.buttonText){
      return (
        <button className="ui button cool" onClick={this.props.buttonAction}>
          {this.props.buttonIcon ? <i className={`${this.props.buttonIcon} icon`} ></i> : null }
          {this.props.buttonText}
        </button>
      )
    }
  }

  renderSecundaryButton() {
    if(this.props.secundaryButton) {
      return (
        <button className={`ui button ${this.props.secundaryButtonClass}`} onClick={this.props.buttonAction}>
          {this.props.secundaryButtonIcon ? <i className={`${this.props.secundaryButtonIcon} icon`} ></i> : null }
          {this.props.secundaryButtonText}
        </button>
      )
    }
  }

  render() {
    return (
      <div >
        <div id="header" className="ui">
          <h1 className="title mg-0">{this.props.title}</h1>
          <div className="headr-button-box">
            {this.renderSecundaryButton()}
            {this.renderMainButton()}
          </div>
        </div>
        <div className="ui clearing divider"></div>
      </div>
    )
  }
}
