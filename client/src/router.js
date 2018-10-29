import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './services/PrivateRoute';
import Login from './pages/Login/';
import Dashboard from './pages/Dashboard';
import NewPost from './pages/New Post';
import Categories from './pages/Categories';
import Users from './pages/Users';
import NewUser from  './pages/New User';
import Config from './pages/Config';
import PostPreview from './pages/Post Preview';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/categories" component={Categories} />
      <PrivateRoute path="/config" component={Config} />
      <PrivateRoute path="/users" component={Users} />
      <PrivateRoute path="/create-user" component={NewUser} />
      <PrivateRoute path="/create-new-post" component={NewPost} />
      <PrivateRoute path="/post-preview/:id" component={PostPreview} />
    </Switch>
  </BrowserRouter>
);

export default Router;