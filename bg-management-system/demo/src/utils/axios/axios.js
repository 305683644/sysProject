import axios from 'axios'
//引入 message组件
import {Message} from 'element-ui'
//引入路由模块
import router from '../../router'

let http=axios.create({
    baseURL:'/api'
})

//请求拦截
http.interceptors.request.use((config)=>{
    let userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
    //全局设置每一个请求头中携带token
    config.headers.authorization=userInfo?userInfo.token:{}
    return config
})


// //响应拦截
http.interceptors.response.use((res)=>{
    if(res.data.code ==403){
        Message.error(res.data.msg)
        //如果token失效就返回登录页面
        router.push('/login')
           
    }
    return res
})





export default http