import axios from 'axios'

const request = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? '/api' : `http://121.37.119.45:8800/api/v1`,
    timeout: 10000,
    // withCredentials:true 
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem('token') || 'null';
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.token) {
        localStorage.setItem('TOKEN', `Bearer ${response.data.token}`);
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default (url, method, data, config = {}) => {
    return request({
        url,
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: data,
        config
    })
}