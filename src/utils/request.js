import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
//添加拦截器
fly.interceptors.request.use((config,promise)=>{
    //给所有请求添加自定义header
    config.headers["X-Tag"]="flyio";
    if(wx.getStorage('token')){
        config.headers['authorization']=wx.getStorage('token');
    }
    return config;
  })
  //配置请求基地址
  fly.config.baseURL='http://159.75.3.52:8090'



// const host = 'http://159.75.3.52:8090'
// // 添加请求拦截器
// fly.interceptors.request.use((request) => {
//   wx.showLoading({
//     title: '加载中',
//     mask: true
//   })
//   console.log('1')
//   console.log(request)
//   console.log('2')
//   // request.headers["X-Tag"] = "flyio";
//   // request.headers['content-type']= 'application/json';
//   request.headers = {
//     'X-Tag': 'flyio',
//     'content-type': 'application/json'
//   }
 
//   let authParams = {
//     // 公共参数
//     // 'categoryType': 'SaleGoodsType@sim',
//     // 'streamNo': 'wxapp153570682909641893',
//     // 'reqSource': 'MALL_H5',
//     // 'appid': 'string',
//     // 'timestamp': new Date().getTime(),
//     // 'sign': 'string'
//   }
 
//   request.body && Object.keys(request.body).forEach((val) => {
//     if (request.body[val] === '') {
//       delete request.body[val]
//     };
//   })
//   request.body = {
//     ...request.body,
//     ...authParams,
//     ...request.headers
//   }
//   return request
// })
 
// // 添加响应拦截器
// fly.interceptors.response.use(
//   (response) => {
//     wx.hideLoading()
//     return response.data // 请求成功之后将返回值返回
//   },
//   (err) => {
//     // 请求出错，根据返回状态码判断出错原因
//     console.log(err)
//     wx.hideLoading()
//     if (err) {
//       return '请求失败'
//     };
//   }
// )
 
// fly.config.baseURL = host
 
export default fly
