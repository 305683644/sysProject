import axios from 'axios'

let http=axios.create({
    baseURL:'/api'
})

//请求拦截
// http.interceptors.request.use((config)=>{
//     let userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
//     //全局设置每一个请求头中携带token
//     config.headers.authorization=userInfo?userInfo.token:{}
//     return config
// })


// //响应拦截
// http.interceptors.response.use((res)=>{
//     return res
// })





export default http