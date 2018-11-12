import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';
import { Categories } from '../categories/';
import { User } from '../users';

const postSchema = new Schema({
  author: {
    type: Object,
    index: true
  },
  cover: {
    type: String
  },
  category: {
    type: Object,
    index: true
  },
  content_cleaned: {
    type: String
  },
  content: {
    type: String,
  },
  short_preview: {
    type: String
  },
  status: {
    type: String
  },
  tags: {
    type: Array,
    trim: true
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  views: {
    type: Number
  },
}, {
  timestamps: true
})

postSchema.pre('save', function(next) {
  if (this.isNew) {
    Categories.findById(this.category.id).then(category => {
      category.post_quantity += 1;
      category.save();
    });
    User.findById(this.author.id).then(user => {
      user.post_quantity +=1;
      user.save();
    });
  }
  this.content_cleaned = removeHtml(this.content);
  this.short_preview = `${this.content_cleaned.substring(0, 500)}...`;
  next();
});

postSchema.pre('remove', function(next) {
  Categories.findById(this.category.id).then(category => {
    category.post_quantity -= 1;
    category.save();
  });
  User.findById(this.author.id).then(user => {
    user.post_quantity -=1;
    user.save();
  });
  next();
});

postSchema.methods = {
  view (full) {
    let view = {};
    let fields = [
      'id',
      'author',
      'status',
      'tags',
      'short_preview',
      'title',
      'views', 
      'cover',
      'category',
      'createdAt' 
    ];

    if (full) {
      fields = [...fields, 'content']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  }
}

postSchema.plugin(mongooseKeywords, { paths: ['title', 'tags'] })

const model = mongoose.model('Post', postSchema);

export const schema = model.schema;
export default model;

const removeHtml = (content) => {
  let data = content.replace(/&nbsp;/,' ');
  data = content.replace(/<.*?>/g, "");
  data = data.replace(/(\b\S.+\b)(?=.*\1)/gi, '').trim();
  return data;
}