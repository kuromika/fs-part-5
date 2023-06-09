import { useState } from 'react'

export const LoginForm = ({ submit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', width:'fit-content' }}>
      <div>
        <label htmlFor='username'>username</label>
        <input type='text' id='username' onChange={handleUsernameChange} value={username}></input>
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input type='password' id='password' onChange={handlePasswordChange} value={password}></input>
      </div>
      <button type='submit'>login</button>
    </form>
  )
}