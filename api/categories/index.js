import { Router } from 'express';
import { token } from '../../services/passport/';
import { create, read, update, destroy } from './controller';
import Categories, { schema } from './model';

export Categories, { schema } from './model';

const router = new Router()

router.get('/',
  token({ required: true }),
  read)

router.post('/',
  token({ required: true }),
  create);

router.put('/:id',
  token({ required: true }),
  update);

router.delete('/:id/',
  token({ required: true }),
  destroy)

export default router
