import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
}

const update = async (id, update) => {
  const response = await axios.put(`${baseUrl}/${id}`, update)
  return response.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update }