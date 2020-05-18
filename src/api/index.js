import replace from 'lodash.replace'

import { message } from 'ant-design-vue'

import { axios, axios2, internalAxios } from './axios'

const api = {
  generateOuterToken: {
    url: '/system/common/generate-out-token',
    method: 'get'
  }
}

export function request({ url, method = 'get', params = {}, urlReplacements = [], multipart = false, download = false }) {
  let reqUrl = url
  urlReplacements.forEach(replacement => {
    reqUrl = replace(reqUrl, replacement.substr, replacement.replacement)
  })
  if (['post', 'patch', 'put'].includes(method)) {
    return axios({
      url: reqUrl,
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
      url: reqUrl,
      params,
      method,
      responseType: download ? 'arraybuffer' : ''
    })
  }
}

export function request2({ url, method = 'get', params = {}, urlReplacements = [], multipart = false, download = false }) {
  let reqUrl = url
  urlReplacements.forEach(replacement => {
    reqUrl = replace(reqUrl, replacement.substr, replacement.replacement)
  })
  if (['post', 'patch', 'put'].includes(method)) {
    return axios2({
      url: reqUrl,
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
    return axios2({
      url: reqUrl,
      params,
      method,
      responseType: download ? 'arraybuffer' : ''
    })
  }
}

export function internalRequest({ url, method = 'get', params = {}, urlReplacements = [], multipart = false, download = false }) {
  let reqUrl = url
  urlReplacements.forEach(replacement => {
    reqUrl = replace(reqUrl, replacement.substr, replacement.replacement)
  })
  if (['post', 'patch', 'put'].includes(method)) {
    return internalAxios({
      url: reqUrl,
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
    return internalAxios({
      url: reqUrl,
      params,
      method,
      responseType: download ? 'arraybuffer' : ''
    })
  }
}

export function generateOuterToken(params = {}) {
  const { tenantId = 1 } = params

  return internalAxios({
    ...api.generateOuterToken,
    params: { tenantId }
  })
}
