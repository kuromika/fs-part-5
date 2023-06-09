import axios from 'axios'
const baseUrl = '/api/blogs'

const createAuth = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, createAuth(token));
  return response.data;
}

const update = async (id, update) => {
  const response = await axios.put(`${baseUrl}/${id}`, update)
  return response.data;
}

const remove = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/${id}`, createAuth(token))
  return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove }