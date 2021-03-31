/*
 * axios 实例封装
 * 通常一个实例对应一个代理
 * 如果有多个代理，可Copy该文件，修改 OPTION 对象，来对应多个Proxy代理
 *
 * @Author: Lee
 * @Date: 2018-03-03 11:25:19
 * @Last Modified by: kaiyou
 * @Last Modified time: 2020-12-07 19:39:08
 */

import axios from 'axios'
import { Message,MessageBox } from 'element-ui'
import router from "@/router";

/**
 * Request基本参数
 */
const OPTION = {
  // 接口基础路径和配置代理的路径
  // url = base url + request url
  baseURL: "http://localhost:8099",
  // baseURL: "https://hqt.cosmoplat.com",
  timeout: 60000,
  // 请求头
  // 请求头信息中不能出现中文
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' // form data格式
    "Content-Type": "application/json;charset=UTF-8" // json格式
    // 'Authorization': 'Bearer f64f0714-8b4e-43d6-853e-17884283f576'
  }
};

// Axios实例
const AXIOS_BASE = axios.create(OPTION)

// 请求拦截器
AXIOS_BASE.interceptors.request.use(
  (config) => {
    // 在发送请求之前处理
    // headers添加token
    // if (store.getters.token) {
    //   config.headers[process.env.VUE_APP_HEADERS_TOKEN] = store.getters.token
      config.headers["Authorization"] = sessionStorage.getItem("Accesstoken");
    //   if (config.baseURL === '/qxzxapi') {
    //     // config.headers[process.env.VUE_APP_HEADERS_TOKEN] = store.state.user.pttoken
    //     config.headers.Authorization = 'f4d84983-ff54-48e9-a8e0-90248976ec8b'
    //   }
    // }
    return config
  },
  // 对请求错误处理
  (error) => Promise.reject(error)
)

// 响应拦截器
AXIOS_BASE.interceptors.response.use(
  // 对响应数据处理
  (response) => {
    const res = response.data
    return res
    /*if ([200, '200'].includes(res.code)) {
      // 接口状态为0，成功
      return res
    } else {
      //暂时注释
      Message({
        message: res.message || 'Error',
        type: 'error',
        showClose: true,
        duration: 5 * 1000
      })
      // router.push('/login')
    }
    return Promise.reject(new Error(res.message || 'Error'))*/
  },
  (error) => {
    // 对响应错误处理
    if (error.message.includes('timeout')) {
      error.message = '请求超时'
    }

    if (error && error.response) {
      /* eslint-disable */
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未登录或登录超时，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错：${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 413:
          error.message = '解析失败';
          break;
        case 500:
          error.message = '系统开小差了哦~~~~ (；′⌒`)';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网络开小差了哦~~~~ (；′⌒`)';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          error.message = '请求错误';
      }
      /* eslint-enable */
    }

    // if (process.env.NODE_ENV === 'development') {
    //   console.error(`错误信息：${error.message}`); // eslint-disable-line
    // }

    //暂时注释
    if (error.response && error.response.status === 402) {
      goLogin()
    } else {
      Message({
        message: error.message,
        type: 'error',
        showClose: true,
        duration: 5 * 1000
      })
    }
      // router.push({
      //   path:"/login"
      // });
    return Promise.reject(error)
  }
)

/**
 * 未登录提示
 */
function goLogin() {
   Message({
     message: "登录超时，请重新登录",
     type: "error",
     showClose: true,
     duration: 5 * 1000,
   });
   router.push("/login");
}

/**
 * axios请求
 * @param {Object} object：options
 * @returns {Promise} Promise
 */
export default  async function({
  baseURL = null,
  url,
  method = 'get',
  data = {},
  headers = {},
  loading = false
}) {
  loading === true
  method = method.toLowerCase() // 请求方法
  let params = {} // 与请求一起发送的 URL 参数

  // 请求参数
  if (['get', 'delete'].includes(method)) {
    params = data
    params.tt = new Date().getTime();
    data = {}
  }

  // request 参数
  const option = {
    url,
    method,
    params,
    data,
    headers
  }

  // baseURL
  baseURL && (option.baseURL = baseURL)

  return new Promise((resolve, reject) => {
    AXIOS_BASE.request(option)
      .then(
        (response) => {
          loading === true
          resolve(response.data)
        },
        (error) => {
          loading === true
          reject(error)
        }
      )
      .catch((error) => {
        loading === true
        reject(error)
      })
  })
}
