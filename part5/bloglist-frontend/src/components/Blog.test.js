import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

function buildProps(editMock, removeMock) {
  const BLOG = {
    title: 'blog title',
    author: 'blog author',
    user: 'user',
    url: 'url',
    likes: 5,
  }

  const props = {
    blog: BLOG,
    editBlog: editMock,
    removeBlog: removeMock,
    user: {
      username: 'username',
      name: 'name'
    }
  }

  return props
}

test('renders content', () => {
  const props = buildProps(jest.fn(), jest.fn())

  const container = render(<Blog {...props}></Blog>).container

  const titleAndAuthor = screen.getByText('blog title blog author')
  expect(titleAndAuthor).toBeDefined()

  const hidden = container.querySelector('.addenum')
  expect(hidden).toHaveStyle('display: none')
})