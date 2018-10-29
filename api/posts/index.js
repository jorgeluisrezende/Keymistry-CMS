import { Router } from 'express';
import { middleware as query } from 'querymen';
import { application, token } from '../../services/passport/';
import { create, read, update, destroy,  show, } from './controller';
import Post, { schema } from './model';
export Post, { schema } from './model';

const router = new Router()

router.get('/',
  query(),
  application({ required: true, callback: read }),
  token({ required: true }),
  read)

router.get('/:id',
  application({ required: true, callback: show }),
  token({ required: true }),
  show)

router.post('/',
  token({ required: true, roles: ['admin'] }),
  create);

router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  update);


router.delete('/:id/',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
