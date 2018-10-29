import React, { Component } from 'react';
import SideMenu from '../../components/SideMenu';
import Header from '../../components/Header';
import { createUser } from '../../services/apiService';

export default class index extends Component {

  state ={
    tags: [],
    token: '',
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    this.setState({...this.state, token});
  }

  componentDidMount() {
    window.$('select.dropdown').dropdown();
  }

  newUSer() {
    const payload = {
      email: this.refs.email.value,
      name: this.refs.name.value,
      password: this.refs.pass.value,
      role: this.refs.role.value,
      access_token: this.state.token
    }
    createUser(payload).then(response => {
      window.swal('Create User', 'User was successfuly created!', 'success');
      this.props.history.push('/users');
    }).catch(err=> {
      const msg = err.response.data.msg;
      if(msg){
        window.swal('Create User', msg, 'warning')
      } else {
        window.swal('Create User', 'Sorry an error has occured!', 'warning');
      }
    })
  }

  render() {
    return (
      <div id="page">
        <div id="sidebar-box">
          <SideMenu />
        </div>
        <div id="main-container" className="ui grid mg-0" >
          <div className="sixteen wide column content">
            <Header 
              title="Create a new User"
              buttonText="Create"
              buttonIcon="check"
              buttonAction={() => this.newUSer()}
            />
            <form className="ui form" style={{paddingLeft: '5%'}}>
              <div className="fields sixteen wide column">
                <div className="field seven wide column ">
                  <label>Name</label>
                  <input type="text" ref="name" name="name" placeholder="Enter the user name"/>
                </div>
                
                <div className="field seven wide column">
                  <label>Role</label>
                  <select className="dropdown" ref="role">
                    <option value="admin">Admin</option>
                    <option value="writer">Writer</option>
                  </select>
                </div>
              </div>
              <div className="fields sixteen wide column">
                <div className="field seven wide column">
                  <label>Email</label>
                  <input type="text" name="email" placeholder="Enter the user email" ref="email"/>
                </div>
                <div className="field seven wide column">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="Enter the user pass" ref="pass"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
