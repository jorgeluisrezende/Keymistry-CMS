import axios from 'axios';

const apiRoot = process.env.NODE_ENV === 'development'? 'http://localhost:9000/api': '/api';

const headers = (token, contentType) => ({
  // 'Content-Type' : contentType || 'Application/json',
  'Authorization': `Bearer ${token}`
})

export const loginAction = (payload) => {
  return axios.post(`${apiRoot}/auth/`, payload);
}

export const createUser = (payload) => {
  return axios.post(`${apiRoot}/users/`, payload);
}

export const publishPost = (payload, token) => {
  return axios.post(`${apiRoot}/posts/`, payload, { headers: headers(token) });
}

export const loadPosts = (token) => {
  return axios.get(`${apiRoot}/posts/`, { headers: headers(token) });
}

export const loadPost = (id, token) => {
  return axios.get(`${apiRoot}/posts/${id}`, { headers: headers(token) });
}

export const updatePost = (id, payload, token) => {
  return axios.put(`${apiRoot}/posts/${id}`, payload, { headers: headers(token) }) 
}

export const destroyPost = (id, token) => {
  return axios.delete(`${apiRoot}/posts/${id}`, { headers: headers(token) })
}

export const getUsers = (token) => {
  return axios.get(`${apiRoot}/users`, { headers: headers(token) });
}

export const updateUser = (id, payload, token) => {
  return axios.put(`${apiRoot}/users/${id}`, payload, { headers: headers(token, 'multipart/form-data') });
}

export const destroyUser = (id, token) => {
  return axios.delete(`${apiRoot}/users/${id}`, { headers: headers(token) })
}

export const getCategories = (token) => {
  return axios.get(`${apiRoot}/categories?access_token=${token}`, {
    headers: headers(token)
  })
}

export const createCategory = (payload) => {
  return axios.post(`${apiRoot}/categories`, payload);
}

export const deleteCategory = (id, token) => {
  return axios.delete(`${apiRoot}/categories/${id}`, {
    headers: headers(token)
  });
}

export const uploadMedia = (media, headers) => {
  console.log(media)
  return axios.post(`${apiRoot}/media/upload`, media, headers);
}

export const createApplication = (payload, token) => {
  return axios.post(`${apiRoot}/applications/create`, payload, {headers: headers(token)});
}

export const loadApplications = (token) => {
  return axios.get(`${apiRoot}/applications/`, {headers: headers(token)});
}

export const destroyApplication = (id, token) => {
  return axios.delete(`${apiRoot}/applications/${id}`, {headers: headers(token)});
}