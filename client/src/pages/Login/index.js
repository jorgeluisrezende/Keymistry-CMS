import React, { Component } from 'react';
import { loginAction } from '../../services/apiService';
import './Login.css';

export default class index extends Component {
  
  componentWillMount() {
    const token = localStorage.getItem('token');
    if(token) {
      this.props.history.push('/dashboard')
    }
  }

  login(e) {
    e.preventDefault();
    const payload = {
      email: this.refs.email.value,
      password: this.refs.pass.value
    }
    loginAction(payload).then((response) => {
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setTimeout(() => this.props.history.push('/dashboard'), 500);
    }).catch(err => {
      const msg = err.response.data.msg;
      window.swal("Login", msg, "warning")
    });
  }

  render() {
    return (
      <div id="login">
        <div  id="grid" className="ui middle aligned center aligned divided grid">
          <div className="greetings">
            <h1>Wellcome</h1>
            <span>Singin to continue...</span>
          </div>
          <form className="ui large form" method="POST">
            <div className="ui">
              <div className="field margin-bottom-0">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input type="text" ref="email" className="border-bottom-radius-0 bga" name="email" placeholder="E-mail address" />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input type="password" ref="pass" className="border-top-radius-0 bga" name="password" placeholder="Password" />
                </div>
              </div>
              <button type="submit" className="ui fluid large submit button" onClick={(e) => this.login(e)}>Login</button>
            </div>
            <div className="ui error message"></div>
          </form> 
        </div>
      </div>
    )
  }
}
