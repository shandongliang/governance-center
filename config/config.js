'use strict'

const userConfig = require('./userConfig');
const utils = require('../build/utils');
const resolve = utils.resolve;
const pkg = utils.getPkg();

const alias = {
  '$moment': 'moment/moment.js',
  '$fetch': resolve('src/util/fetch.js'), // 文件上传
  'jqueryForm': resolve('assets/jquery.form.js'),
  'component': resolve('src/component'),
  'constant': resolve('src/constant'),
  // 工作流
  'Color': resolve('assets/diagram-viewer/Color.js'),
  'JsTools': resolve('assets/diagram-viewer/jstools.js'),
  'Polyline': resolve('assets/diagram-viewer/Polyline.js'),
  'TextLayout': resolve('assets/diagram-viewer/textlayout.js'),
  'ActivitiRest': resolve('assets/diagram-viewer/ActivitiRest.js'),
  'ActivityImpl': resolve('assets/diagram-viewer/ActivityImpl.js'),
  'JqueryAsyncqueue': resolve('assets/diagram-viewer/jquery.asyncqueue.js'),
  'JqueryProgressbar': resolve('assets/diagram-viewer/jquery.progressbar.js'),
  'LineBreakMeasurer': resolve('assets/diagram-viewer/LineBreakMeasurer.js'),
  'ProcessDiagramCanvas': resolve('assets/diagram-viewer/ProcessDiagramCanvas.js'),
  'RaphaelUncompressed': resolve('assets/diagram-viewer/raphael_uncompressed.js'),
  'ProcessDiagramGenerator': resolve('assets/diagram-viewer/ProcessDiagramGenerator.js')
}

module.exports = {
  title: userConfig.title || pkg.title,
  alias: Object.assign({}, alias, userConfig.alias),
  theme: userConfig.theme,
  dev: {
    // 代理
    proxy: userConfig.proxy,
    // devServer 选项
    host: '0.0.0.0', // 设置可以通过IP访问
    port: userConfig.port || 8989,
    //执行 npm start --usehttps
    https: process.env.npm_config_usehttps ? true : false,
    autoOpenBrowser: userConfig.autoOpenBrowser, // 自动打开浏览器
  },
  build: {
    theme: Object.assign({}, userConfig.theme, userConfig.prodTheme),
    // 模块分析，通过npm run build --report可以打开
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // 外部引入的插件，在这里配置
  externals: {},
}