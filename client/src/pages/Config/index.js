import React, { Component } from 'react';
import SideMenu from '../../components/SideMenu';
import Header from  '../../components/Header';
import { createApplication, updateUser, loadApplications, destroyApplication } from '../../services/apiService';

export default class index extends Component {
  state = {
    user: {},
    picture: '',
    token: '',
    apps: [],
    keys: null
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    loadApplications(token).then(response => {
      const apps = response.data;
      this.setState({...this.state, user, picture: user.picture, token, apps});
    })
  }

  onChangeFileInput() {
    const files = this.refs.fileInput.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = ((file) => (e) => this.setState({...this.state, picture: e.target.result}))(files[0]);
  }

  save(e) {
    e.preventDefault();
    const { token, user } = this.state;
    const formData = new FormData(this.refs.form);
    updateUser(user.id, formData, token).then(response => {
      const user = response.data; 
      localStorage.setItem('user', JSON.stringify(user));
      window.location.reload();
    })
  }

  createApp(e) {
    e.preventDefault();
    const name = this.refs.appName.value;
    const token = this.state.token;
    createApplication({ name }, token).then(response => {
      const apps = this.state.apps;
      const keys = { clientID: response.data.clientID, secretID: response.data.secretID };
      apps.push({ id: response.data.id, name: response.data.name, author: response.data.author })
      this.setState({ ...this.state, apps, keys });
    }).catch(err=> {
      const msg = err.response.data.msg;
      if(msg){
        window.swal('Create User', msg, 'warning')
      } else {
        window.swal('Create User', 'Sorry an error has occured!', 'warning');
      }
    })
  }

  downloadKeys() {
    const keys = JSON.stringify(this.state.keys);
    const blob = new Blob([keys], { type:'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'keys.txt';
    link.click();
  }

  deleteApp(id) {
    const token = this.state.token;
    destroyApplication(id, token).then(response => {
      window.location.reload();
    })
  }

  renderApplications() {
    const { apps, keys } = this.state;
    return apps.map((item, index) => {
      if(keys) {
        return (
          <div className="card" key={index}>
            <div className="content">
              <div className="header">App Name: {item.name}</div>
              <div className="description">
                Author: {item.author.name}
              </div>
            </div>
            <div className="ui bottom attached button cool" onClick={() => this.downloadKeys()}>
              Download Keys
            </div>
            <div className="ui bottom attached button tomato"  onClick={() => this.deleteApp(item.id)}>
              remove app
            </div>
          </div>
        )
      } else {
        return (
          <div className="card" key={index}>
            <div className="content">
              <div className="header">App Name: {item.name}</div>
              <div className="description">
                Author: {item.author.name}
              </div>
            </div>
            <div className="ui bottom attached button tomato"  onClick={() => this.deleteApp(item.id)}>
              remove app
            </div>
          </div>
        )
      }
   
    })
  }
  renderIfIsAdmin() {
    if(this.state.user.role === 'admin'){
      return (
        <div className="field eight wide column">
          <label>Application name</label>
          <div className="ui action input">
            <input type="text" placeholder="Web Client" ref="appName"/>
            <button className="ui button" onClick={(e) => this.createApp(e)}>Create</button>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div id="page">
        <div id="sidebar-box">
          <SideMenu />
        </div>
        <div id="main-container" className="ui grid mg-0 " >
          <div className="sixteen wide column content">
            <Header 
              title="Edit your profile"
            />
            <div className="ui grid">
              <form className="ui form seven wide column right-divider pl-5" method="POST" ref="form">
                  <div className="field eleven wide column column-center">
                    <label htmlFor="image" className="ui circular image small centered image-upload">
                      <span className="image-foreground">Change image</span>
                      <img src={this.state.picture} alt="profile_picture" />
                    </label>
                    <input  id="image" type="file" name="image" accept="image/x-png,image/gif,image/jpeg" ref="fileInput" className="hidden" onChange={() => this.onChangeFileInput()}/>
                  </div>
                  
                  <div className="field eleven wide column">
                    <label>Name</label>
                    <input name="name" ref="name" defaultValue={this.state.user.name}/>
                  </div>
                  <div className="field eleven wide column">
                    <label>Password</label>
                    <input name="password" ref="pass" type="password" />
                  </div>
                  <div className="field eleven wide column">
                    <button className="fluid ui button teal" onClick={(e) => this.save(e)}>Save</button>
                  </div>
              </form>
          
              <form  className="ui form nine wide column pl-5" method="POST">
                <h3>Create an Application to get your api keys</h3>
                <div className="fields">
                 { this.renderIfIsAdmin() }
                </div>
                <div className="ui cards">
                  { this.renderApplications() }
                </div>
              </form>
              
            </div>

          </div>
        </div>
      </div>
    )
  }
}
