import { User } from '.';
import { success, notFound, count } from '../../services/response';
import AWS from 'aws-sdk';
import fs from 'fs';
import { 
  s3_accesskey,
  s3_secretkey,
  s3_bucket,
  s3_region
} from '../../config';

export const read = ({querymen: { query, cursor }}, res, next) => {
  User.find(query)
  .limit(cursor.limit)
  .skip(cursor.skip)
  .sort({name: 'asc'})
  .then((users) => users.map((user) => user.view(true)))
  .then(count(res, User, {}))
  .catch(next);
}

export const show = ({ params }, res, next) => {
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next);
}

export const me = ({ user }, res) => res.json(user.view(true));

export const create = ( { body }, res, next) => {
  User.create(body)
    .then((user) => user.view(true))
    .then((success(res, 201)))
    .catch((err) => {
      console.log(err)
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      }
    })
}

export const createAdmin = ({ body }, res, next) => {
  const admin = {
    role: 'admin',
    ...body
  }
  User.create(admin).then((result) => {
    console.log(result)
    res.redirect('/?msg=Success!');
  }).catch((err) => {
    console.log(err);
    res.status(417).json({ msg: "Sorry! an error has happened." })
  })
}

export const update = async (req, res, next) => {
  const data = req.body;
  const user = req.user;
  const params = req.params; 
  const picture = req.files.image.size === 0 ? null : req.files.image;
  if(data.password === '') delete data.password; 
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      if(picture) {
        userImageUpdate(picture).then(response => {
          data.picture = response;
          Object.assign(result, data);
          result.save();
          return result.view(true);
        }).then(success(res));
      }else {
        Object.assign(result, data);
        result.save();
        return result.view(true);
      }
    })
    .then(success(res))
    .catch(next);
}

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) => {
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      } else {
        result.password = body.password;
        result.save();
        res.status(200).json({msg: "Senha alterada com sucesso!"})
      }
    }).catch(err => console.log(err));
}

export const destroy = ({ params }, res, next) => {
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next);
}


 const userImageUpdate = (file) => {
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  const bucketName = s3_bucket;
  const fileStream = fs.createReadStream(file.path);
  s3.config = new AWS.Config();
  s3.config.accessKeyId = s3_accesskey;
  s3.config.secretAccessKey = s3_secretkey;
  s3.config.region = s3_region;
  return new Promise((resolve, reject) => {
    s3.upload({
      Bucket: bucketName, 
      Key: file.originalFilename, 
      Body: fileStream,
      ACL:"public-read"
    },(err,result)=>{
      if(err){
        reject(err);
      }else{
        resolve(result.Location);
      }
    });
  }) 
    
}