/* eslint-disable no-unused-vars */
import path from 'path'
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, './.env'),
    sample: path.join(__dirname, './.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    apiRoot: '/api',
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    s3_accesskey: requireProcessEnv('S3_ACCESS_KEY'),
    s3_secretkey: requireProcessEnv('S3_SECRET_KEY'),
    s3_bucket: requireProcessEnv('S3_BUCKET'),
    s3_region: requireProcessEnv('S3_REGION'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  development: {
    mongo: {
      uri: 'mongodb://localhost/keymistry-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 9000,
    mongo: {
      uri:  process.env.MONGODB_URI || 'mongodb://localhost/keymistry',
      options: {
        debug: false,
      }
    }
  },

}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
