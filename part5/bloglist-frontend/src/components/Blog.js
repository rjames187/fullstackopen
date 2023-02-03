import { useState } from 'react'

const Blog = ({blog}) => {
  const [detailsHidden, setDetailsHidden] = useState(true)

  const buttonText = detailsHidden ? "view" : "hide"
  const handleClick = () => setDetailsHidden(!detailsHidden)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <button onClick={handleClick}>{buttonText}</button>
      <div style={{display: detailsHidden ? 'none' : ''}}>
        <a href={blog.url}>{blog.url}</a>
        <div style={{display: 'flex'}}>
          <div>likes 0</div>
          <button>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>  
  )
}

export default Blog