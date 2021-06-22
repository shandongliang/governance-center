import React from 'react'; import { Modal, message } from 'antd'; import Constant from './../constant/index'; import noop from './noop'; import { BACKSTAGE_PROJ_NAME, IS_CLEAR_THIRDPARTY_SESSION, LOGOUT_REDIRECT_URL } from './../constant/index'; import { authStore, menuStore, cacheStore } from './store'; import { history } from './history'; const fetch = window.fetch; const errorHandle = function ({ code, msg }) { switch (code) { case Constant.AJAX_NET_ERROR: { Modal.error({ title: "异常信息", content: msg }); break; } case Constant.AJAX_LOGIN_TIMEOUT_ERROR: { Modal.error({ title: '异常信息', width: 600, content: <p style={{ wordBreak: 'break-all' }}>{msg}</p>, okText: '确认', onOk: () => { if (authStore.has(Constant.INIT_URL)) { fetchLogOut(); } } }); break; } case "rbac.checkOauth.permIsNull": { Modal.error({ title: '异常信息', width: 600, content: <p style={{ wordBreak: 'break-all' }}>{msg}</p>, okText: '确认', onOk: () => { fetchLogOut(); } }); break; } default: { Modal.error({ title: '异常信息', width: 600, content: <p style={{ wordBreak: 'break-all' }}>{msg}</p>, okText: '确认', onOk: () => { } }); break; } }return { code, msg }; }; function fetchLogOut() { authStore.clear(); menuStore.clear(); cacheStore.clear(); $fetch({ url: '/' + BACKSTAGE_PROJ_NAME + '/rbac/oauthLogout', data: {} }).then(res => { if (!!IS_CLEAR_THIRDPARTY_SESSION) { window.location.href = res.reply.redirectURL; } else { window.close(); if (!!LOGOUT_REDIRECT_URL) { if (LOGOUT_REDIRECT_URL.indexOf('http://') != -1 || LOGOUT_REDIRECT_URL.indexOf('https://') != -1) { window.location.href = LOGOUT_REDIRECT_URL; } else { history.replace(LOGOUT_REDIRECT_URL); } } else { window.location.href = 'about:blank'; } } }); }; const fetchError = function (code = 'error', msg = 'error', accessToken) { errorHandle({ code, msg }); return { code, msg, accessToken } }; const status = function (response) { if (response.status >= 200 && response.status < 300) { return response; } else if (XMLHttpRequest.readyState == 4 && (XMLHttpRequest.status >= 500 && XMLHttpRequest.status <= 504)) { throw new fetchError(Constant.AJAX_NET_ERROR, '服务器 ' + XMLHttpRequest.status + ' 错误'); } else { throw new fetchError(Constant.AJAX_NET_ERROR, response.statusText); } }; const json = function (response) { return response.json(); }; const statusDownload = function (response) { if (response.status >= 200 && response.status < 300) { return response; } else if (XMLHttpRequest.readyState == 4 && (XMLHttpRequest.status >= 500 && XMLHttpRequest.status <= 504)) { throw new fetchError(Constant.AJAX_NET_ERROR, '服务器 ' + XMLHttpRequest.status + ' 错误'); } else { throw new fetchError(Constant.AJAX_NET_ERROR, response.statusText); } }; const successOrNotWithHandle = function (success, failed, isAvoidRepeatSub, router) { return function (json) { const res = json; if (!!isAvoidRepeatSub) { $fetchSyncCurr('/' + BACKSTAGE_PROJ_NAME + '/rbac/getAccessToken', { router }, function (resTmp) { let accessToken = resTmp.reply.result; res.accessToken = accessToken; }) } if (res.reply.returnCode.type == "S") { success(res); return res; } else { const type = res.reply.returnCode.type; const code = res.reply.returnCode.code; const message = res.reply.returnCode.message; let errorType = Constant.AJAX_BUSINESS_ERROR; let errorMsg = ""; if (type == "R" || (type == "E" && code == "FFFFFF")) { errorType = Constant.AJAX_SYSTEM_ERROR; errorMsg = "系统异常,请联系管理员"; } else if (code.toString() == "tesla-security-not-authenticated") { errorType = Constant.AJAX_LOGIN_TIMEOUT_ERROR; errorMsg = "登录超时,返回登录界面"; } else { errorType = Constant.AJAX_BUSINESS_ERROR; if (code != message) { errorMsg = type + " : " + code + " : " + message; } else { errorMsg = type + " : " + code; } } throw new fetchError(errorType, errorMsg, res.accessToken); } }; }; const successOrNotWithHandleSync = function (success, failed) { return function (json) { const res = json; if (res.reply.returnCode.type == "S") { success(res); } else { const type = res.reply.returnCode.type; const code = res.reply.returnCode.code; const message = res.reply.returnCode.message; let errorType = Constant.AJAX_BUSINESS_ERROR; let errorMsg = ""; if (type == "R" || (type == "E" && code == "FFFFFF")) { errorType = Constant.AJAX_SYSTEM_ERROR; errorMsg = "系统异常,请联系管理员"; } else if (code.toString() == "tesla-security-not-authenticated") { errorType = Constant.AJAX_LOGIN_TIMEOUT_ERROR; errorMsg = "登录超时,返回登录界面"; } else if (code.toString() == "rbac.checkOauth.permIsNull") { errorType = "rbac.checkOauth.permIsNull"; errorMsg = "当前用户没有配置权限，请给当前用户配置权限"; } else { errorType = Constant.AJAX_BUSINESS_ERROR; errorMsg = type + ":" + code + ":" + message; } failed(errorMsg); fetchError(errorType, errorMsg); } }; }; const $fetch = function ({ url, data = {}, isAvoidRepeatSub, router, success = noop, failed = noop }) { return fetch(`${url}.json`, { method: 'post', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data), credentials: 'include' }).then(status).then(json).then(successOrNotWithHandle(success, failed, isAvoidRepeatSub, router)) }; export const $fetchSync = function (url, data = {}, success = noop, failed = noop) { return $.ajax({ url: url + ".json", type: "POST", contentType: "application/json", data: JSON.stringify(data), dataType: "json", async: false, success: function (res) { successOrNotWithHandleSync(success, failed)(res); }, error: function (XMLHttpRequest, textStatus, errorThrown) { if (XMLHttpRequest.status >= 200 && XMLHttpRequest.status < 300) { return XMLHttpRequest; } else if (XMLHttpRequest.readyState == 4 && (XMLHttpRequest.status >= 500 && XMLHttpRequest.status <= 504)) { throw new fetchError(Constant.AJAX_NET_ERROR, '服务器 ' + XMLHttpRequest.status + ' 错误'); } else { throw new fetchError(Constant.AJAX_NET_ERROR, textStatus); } } }); }; const $fetchSyncCurr = (url, data = {}, success = noop, failed = noop) => { $.ajax({ url: url + ".json", type: "POST", contentType: "application/json", data: JSON.stringify(data), dataType: "json", async: false, success: function (res) { successOrNotWithHandleSync(success, failed)(res); }, error: function (XMLHttpRequest, textStatus, errorThrown) { if (XMLHttpRequest.status >= 200 && XMLHttpRequest.status < 300) { return XMLHttpRequest; } else if (XMLHttpRequest.readyState == 4 && (XMLHttpRequest.status >= 500 && XMLHttpRequest.status <= 504)) { throw new fetchError(Constant.AJAX_NET_ERROR, '服务器 ' + XMLHttpRequest.status + ' 错误'); } else { throw new fetchError(Constant.AJAX_NET_ERROR, textStatus); } } }); }; export const $uploadfile = function ({ url, data = {}, isAvoidRepeatSub, router, success = noop, failed = noop }) { return fetch(`${url}.upload`, { method: 'post', headers: {}, body: data, credentials: 'include' }).then(status).then(json).then(successOrNotWithHandle(success, failed, isAvoidRepeatSub, router)) }; export const $downloadfile = function ({ url, data = {}, success = noop, failed = noop }) { return fetch(`${url}.download`, { method: 'post', headers: { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 'Content-Type': 'application/json' }, body: JSON.stringify(data), credentials: 'include' }).then(statusDownload) }; export default $fetch;