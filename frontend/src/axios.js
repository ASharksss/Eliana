import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://backend-production-e793.up.railway.app/'
  // baseURL: 'http://localhost:5000/'
})

export default instance
