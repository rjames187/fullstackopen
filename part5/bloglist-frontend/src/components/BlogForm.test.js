import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('calls event handler with correct props', async () => {
  const handler = jest.fn()

  const container = render(<BlogForm addNewBlog={handler}></BlogForm>).container

  const title = container.querySelector('input:nth-of-type(1)')
  await userEvent.type(title, 'title')

  const author = container.querySelector('input:nth-of-type(2)')
  await userEvent.type(author, 'author')

  const url = container.querySelector('input:nth-of-type(3)')
  await userEvent.type(url, 'url')

  const button = container.querySelector('button')
  await userEvent.click(button)

  expect(handler.mock.calls).toHaveLength(1)
  expect(handler.mock.calls[0][0].title).toBe('title')
  expect(handler.mock.calls[0][0].author).toBe('author')
  expect(handler.mock.calls[0][0].url).toBe('url')
})