import React, { Component } from 'react';
import SideMenu from '../../components/SideMenu';
import Header from '../../components/Header';
import { createCategory, getCategories, deleteCategory } from '../../services/apiService';

export default class index extends Component {
  state = {
    categories: [],
    token: ''
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
  
    getCategories(token).then(response => {
      const categories = response.data;
      this.setState({...this.state, categories, token})
    })
  }

  createCategory(event) {
    event.preventDefault();
    const token = this.state.token;
    const categoryName = this.refs.categoryName.value;
    const payload = {
      access_token: token,
      name: categoryName,
    }
    createCategory(payload, token).then(response => {
      const msg = response.data.msg;
      const data = response.data;
      window.swal('Categories', msg, 'success');
      const categories = this.state.categories;
      categories.push(data.category);
      this.setState({...this.state, categories});
      this.refs.categoryName.value = '';
    }).catch(err => {
      if(err.response){
        const msg = err.response ?  err.response.data.msg : null;
        window.swal("Categories", msg, "warning");  
      }
    });
  }

  delCategory(e, item) {
    const token = this.state.token;
    deleteCategory(item._id, token).then(response => {
      const msg = response.data.msg;
      const categories = this.state.categories.filter(i => i._id !== item._id);
      this.setState({...this.state, categories});
      window.swal('Categories', msg, 'success');
    }).catch(err => {
      if(err.response){
        const msg = err.response.data.msg;
        window.swal('Categories', msg, "warning");
      } else {
        window.swal('Categories', "Sorry an error has occurred!", "warning");
      }
    })
  }

  renderCategories() {
    return this.state.categories.map((item, index) => {
      return (
        <tr key={index}>
          <td>{ item.name }</td>
          <td>{ item.creater }</td>
          <td>{ item.post_quantity }</td>
          <td>{ `${new Date(item.createdAt).toDateString()}` }</td>
          <td className="actions-container">
            <button className="ui button mg-0 tomato" onClick={(e) => this.delCategory(e, item)}><i className="trash alternate outline icon mg-0" ></i></button>
          </td>
        </tr>
      )
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
              title="Categories"
            />
            <form className="ui form" method="POST">
              <div className="ui action input">
                <input type="text" placeholder="Create an category..." ref="categoryName" />
                <button className="ui icon button teal" onClick={(e) => this.createCategory(e)}>
                  Create
                </button>
              </div>
            </form>
            <table className="ui very compact celled selectable table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Creater</th>
                  <th>Post quantity</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.renderCategories() }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
