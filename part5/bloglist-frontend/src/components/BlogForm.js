import { useState } from 'react'

const BlogForm = ({ addNewBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    addNewBlog(newBlog)
  }

  return (
    <form onSubmit={addBlog}>
      <label>title</label>
      <input
        value={newTitle}
        onChange={({target}) => setNewTitle(target.value)}
      />
      <br/>
      <label>author</label>
      <input
        value={newAuthor}
        onChange={({target}) => setNewAuthor(target.value)}
      />
      <br/>
      <label>url</label>
      <input
        value={newUrl}
        onChange={({target}) => setNewUrl(target.value)}
      />
      <br/>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm