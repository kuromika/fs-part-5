import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { LoginForm } from './components/LoginForm'
import { login } from './services/login'
import { BlogForm } from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')));
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await login(credentials);
      setUser(user);
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  }

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog, user.token);
      setBlogs(blogs.concat(newBlog));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {!user ? <LoginForm submit={handleLogin}></LoginForm> :
      <div>
        <p>{user.name} logged in</p>
        <button type='button' onClick={handleLogout}>log out</button>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        <BlogForm addBlog={addBlog}></BlogForm>
      </div>}
    </div>
  )
}

export default App