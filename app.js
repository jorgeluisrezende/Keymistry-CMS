import http from 'http'
import { env, port, apiRoot, mongo } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api);
const server = http.createServer(app);

mongoose.connect(mongo.uri, { useNewUrlParser: true });
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, () => {
    console.log('Express server listening on port %s, in %s mode', port, env)
  })
});

export default app;
