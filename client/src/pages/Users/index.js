import React, { Component } from 'react';
import SideMenu from '../../components/SideMenu';
import Header from '../../components/Header';
import { getUsers, destroyUser } from '../../services/apiService';

export default class index extends Component {
  state = {
    count : 0,
    users: [],
    token: ''
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    getUsers(token).then(response => {
      this.setState({ ...this.state, token, users: response.data.data, count: response.data.count});
    }).catch(err => {
      if(err.response) {
        const msg = err.response.data.msg;
        window.swal('Users', msg, 'warning');
      }else {
        window.swal('Users', 'Sorry an error has occurred!', 'warning')
      }
    })
  }

  renderUsers() {
    const users = this.state.users;
    const me = JSON.parse(localStorage.getItem('user'))

    return users.map((item, index) => {
      if(item.id !== me.id) {
        return (
          <tr key={index}>
            <td>{ item.name }</td>
            <td>{ item.role }</td>
            <td>{ item.post_quantity }</td>
            <td>{ item.email }</td>
            <td>
              <button className="ui button mg-0 tomato" onClick={(e) => this.delUser(e, item)}>
                <i className="trash alternate outline icon mg-0" ></i>
              </button>
            </td>
          </tr>
        )
      }
      return false;
    })
  }

  delUser(e, user) {
    const token = this.state.token;
    const users = this.state.users.filter(item => item.id !== user.id);
    destroyUser(user.id, token).then(response => {
      window.swal('User', 'User had successfuly deleted!', 'success');
      this.setState({...this.state, users})
    }).catch(err => {
      window.swal('User', 'An error has occurred, please try again later', 'warning');
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
              title="Your users are here!"
              buttonText="Create User"
              buttonAction= {() => this.props.history.push('/create-user')}
            />
            <table className="ui very compact celled selectable table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Posts</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.renderUsers() }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
