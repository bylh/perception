import axios from 'axios'

let env = process.env.NODE_ENV
let baseUrl;
if (env === 'development') {
    baseUrl = 'http://local.perceive.top:8001'
    // baseUrl = 'https://bylh.top:8000'
} else if (env === 'production') {
    baseUrl = 'https://bylh.top:8000'
}
axios.defaults.baseURL = baseUrl
const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers['Authorization'] = token
}
// withCredentials为true时，后端也要开启AllowCredentials: true 后端跨域AllowAllOrigins不能为true即Access-Control-Allow-Origin不能为'*'
axios.defaults.withCredentials = true;    // 请求携带cookie信息
export default axios;
