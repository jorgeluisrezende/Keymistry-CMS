import { sign } from '../../services/jwt';
import { User } from '../users';
import bcrypt from 'bcrypt';
import { Application } from '../applications';

export const login = ({body}, res, next) => {
  User.find({email: body.email})
  .then((result) => {
    if(result.length < 1) {
      res.status(404).json({msg:'The user was not found!'});
      return;
    }else {
      const user = result[0];
      if(body.password !== ''){
        if (!bcrypt.compareSync(body.password, user.password)) {
          res.status(401).json({ msg: "The password doesn't match!" });
        } else {
          sign(user.id)
          .then((token) => ({ token, user: user.view(true) }))
          .then((data) => res.status(201).json(data))
          .catch(next);
        }
      } else {
        res.status(417).json({msg: "Your password cannot be empty!"});
      }
    }    
  }).catch((err) => {
    console.log(err)
    res.status(417).json({msg: "An error has occurred, try again later!"});
  });
}

export const clientAuth = ({body}, res, next) => {
  Application.find({clientID: body.clientID}).then(apps => {
    const app = apps[0];
    if(app.secretID === body.secretID)
      sign(app.id)
      .then((token) => ({ token, app: app.view() }))
      .then((data) => res.status(201).json(data))
      .catch(next)
    else
      res.status(401).json({msg: "There's something wrong with your keys"});
  })
}
