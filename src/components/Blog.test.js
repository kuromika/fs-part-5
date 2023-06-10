import '@testing-library/jest-dom'
import { getByRole, getByText, render, screen } from '@testing-library/react'
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