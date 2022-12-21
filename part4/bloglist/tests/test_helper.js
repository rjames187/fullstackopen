const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Autistic Psychopathy',
    author: 'Hans Asperger',
    url: 'schizophrenia.com',
    likes: 52
  },
  {
    title: 'The Origin of Species',
    author: 'Charles Darwin',
    url: 'evolution.com',
    likes: 13
  }
]

module.exports = {
  initialBlogs
}
