import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = async (newBlog) => {
    const returnedBlog = await blogService.create(Object.assign(newBlog, { user : user.id }))
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const editBlog = async (params) => {
    await blogService.update(...params)
  }

  const removeBlog = async (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
    await blogService.remove(id)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage("wrong username or password")
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogappUser")
  }

  if (user === null) return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message}/>
      {loginForm()}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <div>
        <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
      </div>

      <Togglable buttonLabel="new blog">
        <BlogForm addNewBlog={addBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} editBlog={editBlog} removeBlog={removeBlog}/>
      )}
    </div>
  )
}

export default App