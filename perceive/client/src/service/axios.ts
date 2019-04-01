import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:4200'
axios.defaults.withCredentials = true    // 请求携带cookie信息

export default axios;