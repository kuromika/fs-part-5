import { useState } from "react"

const Blog = ({ blog, like }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = () => {
    setIsOpen((prev) => !prev);
  }

  const handleLike = () => {
    like(blog.id, blog.likes);
  }

  return (
    <div className="blog">
      <p>{blog.title}{blog.author}<button type='button' onClick={toggleVisibility}>{isOpen ? 'hide' : 'show'}</button></p>
      {isOpen &&
        <div>
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes}<button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
        </div>
      }
    </div>
  )
}

export default Blog