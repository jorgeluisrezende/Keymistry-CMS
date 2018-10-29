import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const mediaSchema = new Schema({
  title: {
    type: String
  },

  type: {
    type: String
  },

  size: {
    tipe: String
  },

  url: {
    type: String
  },
  
  ETag: {
    type: String
  },
  Key: {
    type:String
  }
}, {
  timestamps: true
});


mediaSchema.plugin(mongooseKeywords, { paths: ['title', 'type'] })

const model = mongoose.model('Media', mediaSchema)

export const schema = model.schema;

export default model;
