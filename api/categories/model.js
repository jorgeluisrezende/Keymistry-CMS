import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  creater: {
    type: String,
  },

  post_quantity: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

categorySchema.methods = {
  view () {
    let view = {};
    let fields = [
      'id',
      'name',
      'creater',
      'post_quantity',
      createdAt
    ];

    fields.forEach((field) => { view[field] = this[field] })

    return view
  }
}
categorySchema.plugin(mongooseKeywords, { paths: ['creater', 'name'] })

const model = mongoose.model('Categories', categorySchema)

export const schema = model.schema;

export default model;
