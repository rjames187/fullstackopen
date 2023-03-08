import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, editBlog, removeBlog, user }) => {
  const [detailsHidden, setDetailsHidden] = useState(true)
  const [numLikes, setNumLikes] = useState(blog.likes ? blog.likes : 0)

  const buttonText = detailsHidden ? 'view' : 'hide'
  const handleClick = () => setDetailsHidden(!detailsHidden)
  const handleLike = () => {
    blog.likes = blog.likes ? blog.likes + 1 : 1
    setNumLikes(numLikes + 1)
    editBlog([blog.id, blog])
  }
  const handleDelete = () => {
    removeBlog(blog.id, blog.title, blog.author)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const isSameUser = (a, b) => {
    if (!a || !b) return false
    return a.username === b.username && a.name === b.name
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author}</div>
      <button onClick={handleClick}>{buttonText}</button>
      <div style={{ display: detailsHidden ? 'none' : '' }}>
        <a href={blog.url}>{blog.url}</a>
        <div style={{ display: 'flex' }}>
          <div>likes {numLikes}</div>
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        {
          isSameUser(user, blog.user) ?
            <button onClick={handleDelete}>remove</button> : <></>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  editBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog