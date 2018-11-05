import { Router } from 'express';
import { token, application } from '../../services/passport/';
import { create, read, update, destroy } from './controller';
import Categories, { schema } from './model';

export Categories, { schema } from './model';

const router = new Router()

router.get('/',
  application({ required: true, callback: read }),
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
