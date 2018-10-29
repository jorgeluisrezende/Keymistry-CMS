import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const applicationsSchema = new Schema({
  clientID: {
    type: String
  },
  secretID: {
    type: String
  },
  name: {
    type: String
  },
  author: {
    type: Object
  }
}, {
  timestamps: true
})

applicationsSchema.pre('save', function (next) {
  const hash = crypto.createHash('md5').update(this.id+Math.random()).digest('hex')
  this.clientID = hash;
  this.secretID = crypto.createHash('sha1').update(hash+Math.random()).digest('hex');
  next();
})

applicationsSchema.methods = {
  view (full) {
    let view = {};
    let fields = [
      'id',
      'name',
      'author'
    ];

    if (full) {
      fields = [...fields, 'secretID', 'clientID']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  }
}

const model = mongoose.model('Application', applicationsSchema)

export const schema = model.schema;
export default model;
