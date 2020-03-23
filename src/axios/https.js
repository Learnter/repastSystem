
import axios from 'axios';
import router from "vue-router";
import {Message} from "element-ui";

axios.interceptors.request.use(config => { //请求拦截器
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => { //响应拦截器
  return response;
},error => {
  return Promise.reject(error)
})

function checkStatus (response) { //检验http请求状态码 // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400 || response.status === 204)) {
    return response.data;
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }else if(response.status === 404){
     Message.error({message:'网络错误'});
  }else if(response.status === 500){
     Message.error({message:'服务器错误'});
  }
  // 异常状态下，把错误信息返回去
}

function checkCode (res) { //检测后端抛出的错误 // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if(res.code === 200){
    return res;
  }else{
    Message.error({message:res.msg});
  }
}

export default {
  post (url,data,fileType) {
    //判断是否已经登录...
    let token;
    localStorage.getItem("TOKEN")? token = localStorage.getItem("TOKEN"): token = '';
    return axios({
      method: 'POST',
      baseURL: 'http://api.2020demo.jiafuw.com/v1/checkstand/',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'content-type':fileType ? fileType : 'application/json',
        'token':token
      }
    }).then((response) => {
        return checkStatus(response)
    }).then((res) => {
      return checkCode(res);
    })
  },
  get (url,params) {
     //判断是否已经登录...
    let token;
    localStorage.getItem("TOKEN")? token = localStorage.getItem("TOKEN"): token = '';
    return axios({
      method: 'GET',
      baseURL: 'http://api.2020demo.jiafuw.com/v1/checkstand/',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'content-type': 'application/json',
        'token':token
      }
    }).then((response) => {
        return checkStatus(response)
      }
    ).then((res) => {
        return checkCode(res)
      })
  }
}