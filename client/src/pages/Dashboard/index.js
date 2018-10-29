import React, { Component } from 'react';
import SideMenu from '../../components/SideMenu';
import Posts from '../Posts/';

import './dashboard.css';

export default class index extends Component {
 
  render() {
    return (
      <div id="page">
        <div id="sidebar-box">
          <SideMenu />
        </div>
        <div id="main-container" className="ui grid mg-0" >
          <div className="sixteen wide column content">
            <Posts history={this.props.history}/>
          </div>
        </div>
      </div>
    )
  }
}
