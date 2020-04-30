
import axios from "axios";
import "./index.css"
axios.defaults.withCredentials=true;
axios.defaults.baseURL="http://api.sys.pcg.com";
let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for(let p in pending){
        if(pending[p].u === config.url.split("?")[0]) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1);
        }
    }
}
axios.interceptors.request.use(config=>{
    removePending(config)
    if(config.method==='post'){
        config.data = getFormData(config.data);
    }
    config.cancelToken = new cancelToken((c)=>{
        // 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url.split("?")[0], f: c });//config.data为请求参数
    });
    return config;
},error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(config=>{
    removePending(config.config); //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
    const {status,data} =config;
    return data;

},error => {

    // message.error("数据请求失败！");
    return Promise.reject(error)
});

window.ax=axios;
function getFormData(params){
    const formData = new FormData();
    for ( const key of Object.keys(params) ) {
        if (params[key] !== undefined){
            formData.append(key, params[key]);
        }
    }
    return formData;
}