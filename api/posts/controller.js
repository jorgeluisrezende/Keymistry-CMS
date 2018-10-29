import { Post } from '.';
import { success, notFound } from '../../services/response';

export const create = ({ body }, res, next) => {
  Post.create(body).then(response => {
    res.json({ post: response});
  }).catch(next);
}

export const read = ({ querymen: { query, cursor } }, res, next) => {
  Post.find(query).then(response => {
    const posts = response.map(post => post.view());
    res.json({posts})
  }).catch(next);
}

export const show = ({ params }, res, next) => {
  Post.findById(params.id).then(post => {
    res.json(post.view(true));
  }).catch(next);
}

export const update= ({ params, body }, res, next) => {
  Post.findById(params.id).then(post => {
    Object.assign(post, body);
    post.save();
    res.json(post.view(true));
  }).catch(next);
}

export const destroy = ({ params }, res, next) => {
  Post.findById(params.id)
  .then(notFound(res))
  .then((user) => user ? user.remove() : null)
  .then(success(res, 204))
  .catch(next);
}