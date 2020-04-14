import axios from 'axios'
// 自定义网络请求插件
const MyHttpServer = {}
MyHttpServer.install = Vue => {
  // 在有引入axios文件中设置baseURL(为服务器地址)
  axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
  // axios.defaults.baseURL =
  //   ' https://www.easy-mock.com/mock/5e945fd17d936c21f7f0101a/test'
  // 给Vue原型身上添加属性
  Vue.prototype.$http = axios
}
export default MyHttpServer
