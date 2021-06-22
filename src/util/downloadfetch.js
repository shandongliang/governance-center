import React from 'react';
import { Modal, message } from 'antd';
import { hashHistory } from 'react-router';
import Constant from './../constant/index';
import noop from './noop';
import { authStore, menuStore, oauthStore } from './store';

const fetch = window.fetch;




export default $downloadfiles = function ({ url, data = {}, success = noop, failed = noop }) {
  return fetch(`${url}`, {
    method: 'post',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }).then(resp => {
    return resp.blob().then(blob => {
      const disposition = resp.headers.get('Content-Disposition');

      const match = disposition ? disposition.split('=')[1] : null


      const filename = match ? match : 'unknowfile';
      let a = document.createElement('a')
      document.body.appendChild(a)
      let url = window.URL.createObjectURL(blob)
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      return true
    })
  })

}

//export default $downloadfetchs;
