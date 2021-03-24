import axios from 'axios'
import qs from 'qs'

//设置根路径，可以在后期需要发送请求时使用 简写url  
const baseUrl =  'http://';//这里为服务器地址，或者叫接口地址
axios.defaults.baseURL = baseUrl;

//解决微信小程序直接使用 axios 会报错的问题
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    let data = config.method === 'get' ? config.params : qs.stringify(config.data)
    
    // wx小程序 发起相应请求
    wx.request({
      url: baseUrl + config.url,
      method:config.method,
      data:data,
      success:(res)=>{ return resolve(res)},
      fail:(err)=>{return reject(err)}
    })
  })
}

//封装 axios 请求函数
function get (url,params) {
    return axios({
      method:'get',
      url:url,
      params:params
    })
  }

  function post (url,params) {
    return axios({
      method:'post',
      url:url,
      data:params
    })
  }
export default {
    get: get,
    post: post
}

