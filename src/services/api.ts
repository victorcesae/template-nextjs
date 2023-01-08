import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
})
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    if (error.response?.status === 401) {
      window.location.replace('/dashboard')
    }

    return Promise.reject(error)
  }
)
export default apiClient
