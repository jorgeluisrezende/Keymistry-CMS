import React, { Component } from 'react';
import Editor from '../../components/Editor';
import SideMenu from '../../components/SideMenu';
import Header from '../../components/Header';
import { getCategories, editPost, loadPost } from '../../services/apiService';

export default class index extends Component {

  state ={
    user: {},
    tags: [],
    token: '',
    post: {
      category: {}
    },
    categories: [],
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    getCategories(token).then(response => {
      const categories = response.data;
      this.currentCategory = categories[0];
      this.setState({...this.state, token, categories, user});
    });
    loadPost(this.props.match.params.id, token).then(response => {
      const post = response.data;
      window.editor.root.innerHTML = post.content;
      this.setState({...this.state, post, tags: response.data.tags})
    }); 
  }

  componentDidMount() {
    window.$('select.dropdown').dropdown();
  }

  addTag(event) {
    event.preventDefault();
    this.setState({...this.state, tags: [...this.state.tags, this.refs.tagInput.value]});
    this.refs.tagInput.value = '';
  }

  removeTag(index) {
    const tags = this.state.tags.filter((item, id) => id !== index);
    this.setState({...this.state, tags: tags});
  }
  
  renderTags() {
    return this.state.tags.map((item, index) => (
      <label className="ui label mt-1" key={index}>
        {item}  <i className="delete icon" onClick={() => this.removeTag(index)}></i>
      </label>
    ))
  }

  sendPost() {
    if(window.editor.root.innerHTML === '<p><br></p>' || this.refs.title.value === '' ) {
      window.swal("Post", "Your post or your post title cannot be empty!", "warning");
      return;
    }
    const token = this.state.token;
    const payload = {
      status: 'waiting_publish',
      content: window.editor.root.innerHTML,
      title: this.refs.title.value,
      cover: this.refs.cover.value,
      category:{
        id:this.currentCategory._id,
        name: this.currentCategory.name,
      },
      tags: this.state.tags,
    } 
    const id = this.props.match.params.id;
    editPost(id, payload, token).then(response => {
      window.location.href = '/dashboard'
    })
  }

  loadCategories() {
    const categories = this.state.categories;
    return categories.map((item, index) => (
      <option value={item._id} key={index}>
        { item.name }
      </option>
    ))
  }

  changeCategory(e) {
    this.currentCategory = this.state.categories.filter(item => item._id === this.refs.category.value)[0];
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
            <Header 
              title="Write a new Post"
              buttonText="Save"
              buttonIcon="check"
              secundaryButton={false}
              buttonAction={() => this.sendPost()}
            />
            <form className="ui form">
              <div className="fields sixteen wide column">
                <div className="field seven wide column ">
                  <label>Title</label>
                  <input type="text" ref="title" defaultValue={post.title} placeholder="Enter the title here..."/>
                </div>

                <div className="field seven wide column ">
                  <label>Cover Url</label>
                  <input type="text" defaultValue={post.cover} ref="cover" placeholder="Enter the post cover url here..."/>
                </div>

                <div className="field five wide column">
                  <label>Category</label>
                  <select className="dropdown" defaultValue={post.category.name} ref="category" onChange={this.changeCategory.bind(this)}>
                    { this.loadCategories() }
                  </select>
                </div>

                <div className="field four wide column">
                  <label>Tags</label>
                  <div className="ui right labeled left icon input">
                    <i className="tags icon"></i>
                    <input type="text" placeholder="Enter tags" ref="tagInput"/>
                    <button type="submit" className="ui tag label" onClick={(event) => this.addTag(event)}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
              {this.renderTags()}
            </form>
          </div>
          <div className="sixteen wide column content pd-0">
            <Editor ref="editor" />
          </div>
        </div>
      </div>
    )
  }
}
