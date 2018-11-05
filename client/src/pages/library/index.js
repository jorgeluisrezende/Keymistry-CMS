import React, { Component } from 'react';
import SideMenu from '../../components/SideMenu';
import Header from '../../components/Header';
import { loadMedia } from '../../services/apiService';

export default class index extends Component {
  state = {
    medias: []
  }
  componentWillMount() {
    const token = localStorage.getItem('token');
    loadMedia(token).then(response => {
      const medias = response.data;
      console.log(medias)
      this.setState({ medias });
    });
  }

  componentDidMount() {
    new window.ClipboardJS('.btn');
  }

  renderMedia() {
    const { medias } = this.state;
    return medias.map((item, index) => (
      <div className="card" key={ index }>
        <div className="blurring dimmable image">
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <div className="ui inverted button">Add Friend</div>
              </div>
            </div>
          </div>
          <img src={ item.url }/>
        </div>
        <div className="content">
          <a className="header">{ item.title }</a>
          <div className="meta">
            <span className="date">{ `Created at ${new Date(item.createdAt).toDateString()}` }</span>
          </div>
        </div>
        <div className="extra content">
          <div className="ui input right labeled">
            <input id={`input-${index}`} value={item.url} readOnly/>
            <a className="ui button btn center aligned" data-clipboard-target={`#input-${index}`}>
              <i className="copy icon"></i>
            </a>
          </div> 
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div id="page">
        <div id="sidebar-box">
          <SideMenu />
        </div>
        <div id="main-container" className="ui grid mg-0" >
          <div className="sixteen wide column content">
            <Header title="Here you found the media you uploaded!"/>
            <div className="ui special cards" >
              { this.renderMedia() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
