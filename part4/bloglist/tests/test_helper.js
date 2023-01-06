const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

const credentials = {
  username: 'brock',
  password: 'brock21415!'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const registerAndLogIn = async () => {
  const username = "brock"
  const name = "Brian Rockwell"
  const password = "brock13421!"

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash
  })

  await user.save()

  const fetchedUser = await User.findOne({ username })

  const userForToken = {
    username: user.username,
    id: fetchedUser._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return token
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  registerAndLogIn
}
