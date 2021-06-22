const userConfig = {
  // antd 主题
  theme: {
    "dark-color": "#464545",
    "link-color": "#1074c2",
    "btn-group-border": "#0066cb",
    "border-radius-base": "0px",
    "icon-url": "'/assets/iconfont/iconfont'"
  },
  // 生产环境 主题，用于配置  icon-url，注意修改为生产环境包路径
  prodTheme: {
    "icon-url": "'/pandora-web/assets/iconfont/iconfont'"
  },
  // webpack-dev-server 代理
  proxy: {
    '/tesla-gateway-console-app': {
      // target: 'http://localhost:8080',
      // target: 'http://197.3.128.244:18080',
      target: 'http://197.0.96.84:8091',
      changeOrigin: true
    }
  },
  port: 8989, // webpack-dev-server 端口
  autoOpenBrowser: true, // 自动打开浏览器
  alias: {} // 配置别名
}

module.exports = userConfig
