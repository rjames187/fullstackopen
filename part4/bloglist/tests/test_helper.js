const User = require('../models/user')
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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}
