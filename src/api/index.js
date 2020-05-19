import replace from 'lodash.replace'
import isEmpty from 'lodash.isempty'
import qs from 'qs'

import { axios } from './axios'

export function request({ url, method = 'get', params = {}, queryString = {}, urlReplacements = [], multipart = false, download = false }) {
  let reqUrl = url
  urlReplacements.forEach(replacement => {
    reqUrl = replace(reqUrl, replacement.substr, replacement.replacement)
  })
  if (['post', 'patch', 'put'].includes(method)) {
    return axios({
      url: isEmpty ? reqUrl : `${reqUrl}?${qs.stringify(queryString)}`,
      data: params,
      method,
      headers: multipart
        ? {
            'Content-Type': 'multipart/form-data'
          }
        : {},
      responseType: download ? 'arraybuffer' : ''
    })
  } else if (['get', 'delete'].includes(method)) {
    return axios({
      url: isEmpty ? reqUrl : `${reqUrl}?${qs.stringify(queryString)}`,
      params,
      method,
      responseType: download ? 'arraybuffer' : ''
    })
  }
}
