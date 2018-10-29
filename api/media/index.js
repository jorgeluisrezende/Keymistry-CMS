import { Router } from 'express';
import { token } from '../../services/passport/';
import { create, read, destroy } from './controller';
import Media, { schema } from './model';

export Media, { schema } from './model';

const router = new Router()

router.get('/',
  token({ required: true }),
  read);

router.post('/upload',
  token({ required: true }),
  create);

router.delete('/:id/',
  token({ required: true }),
  destroy);

export default router
