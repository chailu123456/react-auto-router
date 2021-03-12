import axios from 'axios';
let url = 'http://10.10.163.53:8090'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map();

const addPending = (config) => {
  console.log(config);
  const url = [
    config.method,
    config.url,
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })

}

/**
 * 移除请求
 * @param {Object} config 
 */
const removePending = (config) => {
  const url = [
    config.method,
    config.url
  ].join('&')

  if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

const instance = axios.create({
  baseURL: url,
  timeout: 5000
})
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(
  config=>{
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    let token = localStorage.getItem('token')
    config.headers['Authorization'] = 'Bearer '+ token
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    return config
  },
  error=>Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  //请求成功
  res=>{
    removePending(res.config) // 在请求结束后，移除本次请求
    if (res.status === 200) {
      return res.data
    }
    console.log(res)
  },
  error=>{
    console.log(error);
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      alert("网络超时");
      return false
    }
    const { response } = error;
    
    if(response) {
      // 请求已发出，但是不在2xx的范围 
      console.log(response)
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);

    }
  }
)
/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  console.log(status)
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // toLogin();
      console.log('请登录');
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      alert('登录过期，请重新登录');
      localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      console.log('请求的资源不存在'); 
      break;
    default:
      console.log(other);   
  }
}
/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  return 3
  // router.replace({
  //   path: '/login',        
  //   query: {
  //     redirect: router.currentRoute.fullPath
  //   }
  // });
}

export const ClearPending = () => {
  console.log(77777);
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

export class Request {
  constructor () {
    this.instance = instance
  }
}