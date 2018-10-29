import { Media } from '.';
import AWS from 'aws-sdk';
import fs from 'fs';
import { 
  s3_accesskey,
  s3_secretkey,
  s3_bucket,
  s3_region
} from '../../config';

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const bucketName = s3_bucket;

export const create = (req, res, next) => {
  const file = req.files.media;
  const fileStream = fs.createReadStream(file.path);
  s3.config = new AWS.Config();
  s3.config.accessKeyId = s3_accesskey;
  s3.config.secretAccessKey = s3_secretkey;
  s3.config.region = s3_region;

  s3.upload({
    Bucket: bucketName, 
    Key: file.originalFilename, 
    Body: fileStream,
    ACL:"public-read"
  },(err,result)=>{
    if(err){
      console.log(err);
      res.status(400).json({msg:"One error has occurred on upload!"});
    }else{
      Media.create({
        title: file.originalFilename,
        url: result.Location,
        ETag: result.ETag,
        type: file.type,
        Key: result.Key,
        size: file.size
      }).then(response => {
        res.json({ url: response.url, title: response.title});
      }).catch(err => {
        res.status(417).json({msg: "Sorry an error has occured!"});
      });
    }
  });

}

export const read = ({ user, body }, res, next) => {

}

export const destroy = ({ user, body }, res, next) => {

}

