import axios from 'axios'
let env = process.env.NODE_ENV
let baseUrl;
if (env === 'development') {
    baseUrl = 'http://127.0.0.1:8001'
} else if (env === 'production') {
    baseUrl = 'https://bylh.top:8000'
}
axios.defaults.baseURL = baseUrl
// withCredentials为true时，后端也要开启AllowCredentials: true 后端跨域AllowAllOrigins不能为true即Access-Control-Allow-Origin不能为'*'
// axios.defaults.withCredentials = true;    // 请求携带cookie信息

export default axios;
