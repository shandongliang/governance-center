import fetch, { $uploadfile } from './../../../../util/fetch';
import $downloadfetchs from './../../../../util/downloadfetch';
import url from './urlConfig'

//获取审核码
export function getSequenceGenerator(params) { //获取审核码
  return fetch({
    url: url.getSequenceGenerator,
    data: params
  })
}