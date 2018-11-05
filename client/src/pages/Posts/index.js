import React, { Component } from 'react'
import Header from '../../components/Header';
import { loadPosts, destroyPost } from '../../services/apiService';

import './posts.css';

export default class index extends Component {
  state = {
    posts: [],
    token: ''
  }

  componentWillMount() {
    try {
      const token = localStorage.getItem('token');
      loadPosts(token).then(response => {
        this.setState({ ...this.state, posts: response.data.posts, token });
      });
    }catch(err) {
      console.error(err)
      window.reload();
    }
  }

  editPost(post) {
    this.props.history.push(`/edit-post/${post.id}`);
  }

  deletePost(post) {
    const token = this.state.token;
    destroyPost(post.id, token).then(response => {
      window.location.reload();
    });
  }

  renderTags(tags) {
    return tags.map((tag, index) => {
      return (
        <label key={index} className="tags">{ tags }</label>
      )
    })
  }

  renderPosts() {
    const { posts } = this.state;
  
    return posts.map((post, index) => {
      return (
      <tr key={index} style={{cursor: 'pointer'}} >
        <td onClick={() => this.props.history.push(`/post-preview/${post.id}`)}>{ post.title }</td>
        <td>{ post.status }</td>
        <td>{ post.category.name }</td>
        <td>{ post.author.name }</td>
        <td>{ this.renderTags(post.tags) }</td>
        <td>{ new Date(post.createdAt).toDateString() }</td>
        <td className="actions-container">
          <button className="ui button mg-0 twitter" onClick={() => this.editPost(post)}><i className="edit outline icon mg-0" ></i></button>
          <button className="ui button mg-0 tomato" onClick={() => this.deletePost(post)}><i className="trash alternate outline icon mg-0" ></i></button>
        </td>
      </tr>
    )});
  }

  render() {
    return (
      <div>
        <Header 
          title="Look what you've posted so far!" 
          buttonAction={() => this.props.history.push('/create-new-post')} 
          buttonText="Write a new post"
          buttonIcon="plus"
        />
        <div className="above-table">
          <div className="ui category search">
            <div className="ui icon input">
              <input className="prompt" type="text" placeholder="Search your posts..."/>
              <i className="search icon"></i>
            </div>
            <div className="results"></div>
          </div>
          <div className="ui right floated pagination menu mb-1">
            <button className="ui button icon item">
              <i className="left chevron icon"></i>
            </button>
            <button className="ui button item">1</button>
            <button className="ui button item">2</button>
            <button className="ui button item">3</button>
            <button className="ui button item">4</button>
            <button className="ui button icon item">
              <i className="right chevron icon"></i>
            </button>
          </div>
        </div>
        <table className="ui very compact celled selectable table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Category</th>
              <th>Author</th>
              <th>tags</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           { this.renderPosts() }
          </tbody>
        </table>

      </div>
    )
  }
}
