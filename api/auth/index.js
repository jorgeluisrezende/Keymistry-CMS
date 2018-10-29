import { Router } from 'express'
import { login, clientAuth } from './controller'

const router = new Router()

router.post('/',
login)

router.post('/client',
clientAuth)

export default router
