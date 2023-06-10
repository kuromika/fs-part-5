import { render, screen } from '@testing-library/react'
import { BlogForm } from './BlogForm'
import userEvent from '@testing-library/user-event'


test('Form calls event handler with with the right parameters', async () => {
  const addMock = jest.fn()
  render(<BlogForm addBlog={addMock}></BlogForm>)
  const user = userEvent.setup()
  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')
  const submitButton = screen.getByRole('button', { name: 'create' })
  await user.type(titleInput, 'hello')
  await user.type(authorInput, 'world')
  await user.type(urlInput, 'www.google.com')
  await user.click(submitButton)
  expect(addMock.mock.calls[0][0]).toEqual({
    title: 'hello',
    author: 'world',
    url: 'www.google.com'
  })

})