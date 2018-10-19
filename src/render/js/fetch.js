import axios from 'axios'
import * as constant from './constant'
import {Loading, Message} from 'element-ui'

let service = axios.create({
  baseURL: constant.baseUrl,
  timeout: constant.timeout,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，比如说加头部验证
  /*config.headers['authorization'] = 'RXTHINKING@@@@eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Mzk5MTQxNjQsImlhdCI6MTUzOTgyNzc2NCwiaXNzIjoia2VuIiwiZGF0YSI6eyJ1c2VybmFtZSI6InN1bmppbmd3ZW4iLCJyb2xlIjoiYWRtaW4iLCJsb2dpbl90aW1lIjoxNTM5ODI3NzY0fX0.TgiNN4lQVal0n4HYUN7r2LRSa_d_smmpsSNSdxx7aCE';*/
  //显示loading
  showLoadingFn();
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error);  //for debuger
  setTimeout(() => {
    hideLoadingFn();
  }, constant.duringTime)
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  hideLoadingFn();
  if (response.status == 200) {
    return Promise.resolve(response.data)
  } else {
    Message({
      message: response.data.error.message,
      type: 'error',
      duration: constant.duringTime,
    });
    return Promise.reject(response.data.error.message)
  }
}, function (error) {
  // 对响应错误做点什么
  hideLoadingFn();
  Message({
    message: error.message,
    type: 'error',
    duration: constant.duringTime,
  });
  return Promise.reject(error);
});

let loadingInstance1

//显示请求加载loading
function showLoadingFn() {
  loadingInstance1 = Loading.service({
    lock: true,
    text: "正在加载中.....",
    background: 'rgba(255,255,255,.7)'
  });
}

//隐藏请求加载loading
function hideLoadingFn() {
  loadingInstance1.close()
}

//get请求
export function getAjax(url = '', data = {}) {
  return service.get(url, {
    params: data
  })
}

//post请求
export function postAjax(url = '', data = {}) {
  return service.post(url, data)
}

/*
 *  多请求并发执行
 *  返回的结果是：对应请求的地址得到的结果组成的数组
 */
export function allAjax(...params) {
  let value = params.map(val => {
    if (val.method) {
      let method = '';
      switch (val.method.toLowerCase()) {
        case 'get':
          method = 'get';
          break;
        case 'post':
          method = 'post';
          console.log(11)
          break;
        default:
          console.error(`请求方法${val.method.toLowerCase()}没定义，请先定义再调用！`)
          break;
      }
      return `${method}Ajax(${val.url}, ${val.data})`
    } else {
      return getAjax(val.url, val.data)
    }
  })

  return axios.all(value).then(axios.spread(function (...response) {
    // 所有请求现在都执行完成
    return Promise.resolve(response);
  }))
}

