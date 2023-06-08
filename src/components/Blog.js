import { useState } from "react"

const Blog = ({ blog }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = () => {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="blog">
      <p>{blog.title} <button type='button' onClick={toggleVisibility}>{isOpen ? 'hide' : 'show'}</button></p>
      {isOpen &&
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes}<button>like</button></p>
          <p>{blog.author}</p>
        </div>
      }
    </div>
  )
}

export default Blog