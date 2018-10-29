import React, { Component } from 'react'
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { loadPost, updatePost } from '../../services/apiService';

export default class Preview extends Component {
  state = {
    post: {},
    token: '',
    user: {}
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const { id } = this.props.match.params;
    loadPost(id, token).then(res => {
      this.setState({post : res.data, id, token, user});
      // this.refs.content.innerHTML(res.data.content)
    });
  }

  approve() {
    const { token, id } = this.state;
    updatePost(id, { status: 'published' }, token).then(res => {
      window.location.href = '/dashboard';
    });
  }
  renderHeader() {
    if(this.state.user.role === 'admin'){
      return ( 
        <Header 
          title="Preview your post"
          buttonAction={() => this.approve()} 
          buttonText="Approve"
          buttonIcon="check"
        />)
    }else {
      return <Header title="Preview your post" />
    }
  }
  render() {
    const { post } = this.state;
    return (
      <div id="page">
        <div id="sidebar-box">
          <SideMenu />
        </div>
        <div id="main-container" className="ui grid mg-0" >
          <div className="sixteen wide column content">
            { this.renderHeader() }
            <div id="post"> 
              <h2>{post.title}</h2>
              <div ref="content" dangerouslySetInnerHTML={{__html: post.content}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}