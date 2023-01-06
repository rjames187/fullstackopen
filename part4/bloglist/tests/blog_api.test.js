const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

var token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  
  token = await helper.registerAndLogIn()
  console.log(token)

  const blogObjects = helper.initialBlogs
  .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('returns correct amount of blog posts as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('unique identifier property of blog posts is named "id"', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

describe('addition of a blog', () => {
  test('a blog can be added', async () => {
    console.log(token)

    const newBlog = {
      title: 'The Center Cannot Hold',
      author: 'Elyn Saks',
      url: 'law.com',
      likes: 10045
    }
  
    await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog)
      .expect(201).expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('The Center Cannot Hold')
  }, 10000)
  
  test('missing likes property defaults to zero', async () => {
    const newBlog = {
      title: 'The Center Cannot Hold',
      author: 'Elyn Saks',
      url: 'law.com'
    }
  
    const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`)
      .send(newBlog)
    expect(response.body.likes).toBe(0)
  })
  
  test('missing title or url property results in status code 400', async () => {
    const titlelessBlog = {
      author: 'Elyn Saks',
      url: 'law.com',
      likes: 10045
    }
  
    const urllessBlog = {
      title: 'The Center Cannot Hold',
      author: 'Elyn Saks',
      likes: 10045
    }
  
    await api.post('/api/blogs').send(titlelessBlog).set('Authorization', `bearer ${token}`).expect(400)
    await api.post('/api/blogs').send(urllessBlog).set('Authorization', `bearer ${token}`).expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete)
    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `bearer ${token}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    await api.delete('/api/blogs/12').set('Authorization', `bearer ${token}`).expect(400)
  })
})

describe('update of a blog', () => {
  const newBlog = {
    title: 'Industrial Society and its Future',
    author: 'F.C.',
    url: 'tjk.com',
    likes: 3456
  }

  test('note is successfully updated if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `bearer ${token}`).send(newBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const updatedBlog = blogsAtEnd.filter(b => b.title === newBlog.title)[0]
    expect(updatedBlog.id).toBe(blogToUpdate.id)
  })

  test('fails with status code 400 if id is invalid', async () => {
    await api.put('/api/blogs/356').set('Authorization', `bearer ${token}`).send(newBlog).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
