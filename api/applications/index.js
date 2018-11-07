import { Router } from 'express'
import { create, read, destroy } from './controller'
import { token, application } from '../../services/passport/';
import Application, {schema} from './'

export Application, {schema} from './model';

const router = new Router()

router.post('/create',
token({required: true, roles: ['admin']}),
create)

router.get('/',
token({ required: true }),
read);

router.delete('/:id',
token({required: true, roles: ['admin']}),
destroy);

export default router
