import { Categories } from '.';

export const create = ({ user, body }, res, next) => {
  const category = {
    name: body.name,
    creater: user.name
  }
  Categories.create(category).then(response => {
    res.json({ msg: 'Category has successfuly created!', category: response })
  }).catch(err => {
    console.log(err);
    res.status(417).json({ msg: 'Sorry an error has occurred!' });
  });
}

export const read = ({ user, body }, res, next) => {
  Categories.find().then(response => {
    res.json(response);
  }).catch(err=> {
    res.status(417).json({ msg: 'Sorry an error has occurred!' });
  });
}

export const update = () => {

}

export const destroy = ({ user, params }, res, next) => {
  Categories.findByIdAndRemove(params.id).then(response => {
    res.json({ msg: 'Category has succesfuly deleted!' });
  }).catch(err=> {
    res.status(417).json({ msg: 'Sorry an error has occurred, try again later!' });
  });
}