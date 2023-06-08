import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { LoginForm } from './components/LoginForm'
import { login } from './services/login'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({message:'', type:''});

  useEffect(() => {

    if (notification && notification.message) {
      const timeout = setTimeout(() => {
      setNotification({message: '', type:''});
      }, 3000);
      
      return () => {
        clearTimeout(timeout);
      }
    }

  }, [notification])

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
      setNotification({message: 'Logged in successfully', type:'success'})
    } catch (error) {
      setNotification({message: 'Wrong username or password', type:'error'})
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('user');
    setNotification({message: 'Logged out successfully', type:'success'})
  }

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog, user.token);
      setBlogs(blogs.concat(newBlog));
      setNotification({message: `New blog '${newBlog.title}' by ${newBlog.author} added`, type:'success'})
    } catch (error) {
      setNotification({ message: 'There was a problem adding the blog', type: 'error' });
    }
  }

  return (
    <div>
      <Notification notification={notification}></Notification>
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