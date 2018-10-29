import { Application } from '.';
import { success, notFound } from '../../services/response';

export const create = ({ body, user }, res, next) => {
  Application.create({...body, author: user.view()})
  .then(response => response.view(true))
  .then(success(res))
  .catch(next);
}

export const read = (req, res, next) => {
  Application.find({})
  .then(apps => apps.map(app => app.view()))
  .then(success(res))
  .catch(next);
}

export const destroy = ({ params }, res, next) => {
  Application.findById(params.id)
  .then(notFound(res))
  .then((user) => user ? user.remove() : null)
  .then(success(res, 204))
  .catch(next);
}