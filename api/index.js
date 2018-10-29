import { Router } from 'express';
import users from './users';
import auth from './auth';
import posts from './posts';
import categories from './categories';
import media from './media';
import application from './applications';

const router = new Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/categories', categories);
router.use('/media', media);
router.use('/posts', posts);
router.use('/applications', application);

export default router;
