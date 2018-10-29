import { Router } from 'express';
import path from 'path';
import { User } from '../api/users';

const router = Router();

router.get('/', (req, res) => {
  User.count({role: 'admin'}).then((result) => {
    if(result > 0){
      res.sendFile(`${path.resolve()}/client/build/index.html`);
    }else {
      res.sendFile(`${path.resolve()}/config.html`);
    }
  })
});

router.get('*', (req, res) => {
  res.sendFile(`${path.resolve()}/client/build/index.html`);
});
module.exports = router;
