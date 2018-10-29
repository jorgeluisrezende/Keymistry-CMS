import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multiparty from 'connect-multiparty';
import morgan from 'morgan';
import path from 'path';

export default (apiRoot, routes) => {
  const app = express();
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
  });
  app.use(express.static(`${path.resolve()}/client/`));
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(multiparty());
  app.use(bodyParser.json());
  app.use(apiRoot, routes);
  app.use(require('../../routes'))


  return app;
}
