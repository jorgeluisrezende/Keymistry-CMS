import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './sidemenu.css';

export default class index extends Component {
  state = {
    user: {}
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({...this.state, user})
  }

  renderOnlyIfAdmin() {
    if(this.state.user.role === 'admin') {
      return (
        <Link to={'/users'} className="item">
          Users  <i className="user outline icon"></i>
        </Link>
      );
    }
  }

  render() {
    return (
      <div className="mg-0">
        <button className="ui button hide-menubar"><i className="bars icon mg-0"></i></button>
        <div id="sidebar" className="ui vertical menu mg-0">
          <div className="avatar-box">
            <img className="ui tiny circular image" alt="user avatar" src={this.state.user.picture} />
            <span className="user-name">{this.state.user.name}</span>
            <div>
              <Link className="ui button" to={'/config'}><i className="cog icon mg-0"></i></Link>
              <button className="ui button"><i className="sign out alternate icon mg-0"></i></button>
            </div>
          </div>
          <div>
            <Link to={'/dashboard'} className="item">
              Posts <i className="edit outline icon"></i>
            </Link>
            {/* <Link to={'/drafts'} className="item ">
              Drafts <i className="sticky note outline icon"></i>
            </Link> */}
            <Link to={'/categories'} className="item ">
              Categories <i className="tag icon"></i>
            </Link>
            <Link to={'/library'} className="item">
              Media Library  <i className="images outline icon"></i>
            </Link>
            { this.renderOnlyIfAdmin() }
          </div>
        </div>
      </div>
    )
  }
}
