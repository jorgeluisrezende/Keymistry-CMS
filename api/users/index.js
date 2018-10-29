import { Router } from 'express';
import { middleware as query } from 'querymen';
import { master, token } from '../../services/passport/';
import { create, read, update, destroy, me, show, updatePassword, createAdmin } from './controller';
import User, { schema } from './model';
export User, { schema } from './model';

const router = new Router()
const { password } = schema.tree

router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  read)

router.get('/me',
  token({ required: true }),
  me)

router.get('/:id',
  show)

router.post('/',
  token({required: true, roles: ['admin']}),
  create);


router.post('/first-admin', master(), createAdmin)

router.put('/:id',
  token({ required: true, roles: ['admin']}),
  update);

router.put('/:id/password',
  token({ required: true }),
  updatePassword)

router.delete('/:id/',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
