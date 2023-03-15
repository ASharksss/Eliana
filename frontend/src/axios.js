import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://backend-production-8820.up.railway.app/'
})


export default instance
