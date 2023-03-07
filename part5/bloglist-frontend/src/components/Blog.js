import { useState } from 'react'

const Blog = ({blog, editBlog, removeBlog}) => {
  const [detailsHidden, setDetailsHidden] = useState(true)
  const [numLikes, setNumLikes] = useState(blog.likes ? blog.likes : 0)

  const buttonText = detailsHidden ? "view" : "hide"
  const handleClick = () => setDetailsHidden(!detailsHidden)
  const handleLike = () => {
    blog.likes = blog.likes ? blog.likes + 1 : 1
    setNumLikes(numLikes + 1)
    editBlog([blog.id, blog])
  }
  const handleDelete = () => {
    const id = blog.id
    removeBlog(id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author}</div>
      <button onClick={handleClick}>{buttonText}</button>
      <div style={{display: detailsHidden ? 'none' : ''}}>
        <a href={blog.url}>{blog.url}</a>
        <div style={{display: 'flex'}}>
          <div>likes {numLikes}</div>
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>  
  )
}

export default Blog