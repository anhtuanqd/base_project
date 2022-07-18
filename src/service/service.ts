import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 10000,
})
instance.interceptors.request.use(
  (configs) => {
    return configs
  },
  async (error) => {
    await Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (configs) => {
    return configs
  },
  async (error) => {
    return await Promise.reject(error)
  },
)

const get = async (url: string, params = {}) => {
  const config = { params }
  const response = await instance.get(url, config)
  return response.data
}

const post = async (url: string, data = {}, headers?: any) => {
  const response = await instance.post(url, data, headers)
  return response.data
}

const put = async (url: string, data = {}, headers?: any) => {
  const response = await instance.put(url, data, headers)
  return response.data
}

const patch = async (url: string, data = {}) => {
  const response = await instance.patch(url, data)
  return response.data
}

const del = async (url: string, data = {}) => {
  const response = await instance.delete(url, data)
  return response.data
}

export { get, post, put, patch, del }
