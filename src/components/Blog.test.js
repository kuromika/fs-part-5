import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const testBlog = {
  title: 'test blog',
  author: 'kuromika',
  likes: 10,
  url: 'www.google.com',
  user: {
    username: 'mikaela',
    id: '12345',
    name:'maki'
  }
}

test('renders title and author but not url or likes by default', () => {
  render(<Blog blog={testBlog}></Blog>)
  const paragraph = screen.getByText('test blog kuromika')
  expect(paragraph).toBeDefined()
})

test('renders likes and url when button is clicked', async () => {
  render(<Blog blog={testBlog}></Blog>)
  const user = userEvent.setup()
  const showButton = screen.getByRole('button', { name: /show/i })
  await user.click(showButton)
  const likes = screen.getByText('10')
  const url = screen.getByRole('link', { name: /www.google.com/i })
  expect(likes).toBeDefined()
  expect(url).toBeDefined()
})

test('like button is called exactly twice', async () => {
  const likeMock = jest.fn()
  render(<Blog blog={testBlog} like={likeMock}></Blog>)
  const user = userEvent.setup()
  const showButton = screen.getByRole('button', { name: /show/i })
  await user.click(showButton)
  const likeButton = screen.getByRole('button', { name: 'like' })
  await user.click(likeButton)
  await user.click(likeButton)
  expect(likeMock.mock.calls).toHaveLength(2)
})