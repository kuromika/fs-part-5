import { useState } from "react"

export const BlogForm = ({addBlog}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');

  const resetInputs = () => {
    setAuthor('');
    setTitle('');
    setUrl('');
  }

  const handleInputChange = (stateSetter) => {
    return ({ target }) => {
      stateSetter(target.value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog({ title, url, author });
    resetInputs();
  }

  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', width:'fit-content'}}>
      <h2>create new blog</h2>
      <div>
        <label htmlFor='title'>title:</label>
        <input type='text' value={title} id='title' onChange={handleInputChange(setTitle)}></input>
      </div>
      <div>
        <label htmlFor='author'>author:</label>
        <input type='text' value={author} id='author' onChange={handleInputChange(setAuthor)}></input>
      </div>
      <div>
        <label htmlFor='url'>url:</label>
        <input type='text' value={url} id='url' onChange={handleInputChange(setUrl)}></input>
      </div>
      <button type='submit'>create</button>
    </form>
  )



}