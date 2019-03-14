// 工具函数库

import config from '../config'
import { hostname } from 'os';

export function request(url, data) {
  return new Promise( (resolve, reject) => {
    wx.request({
      url: config.host+url,
      data,
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  })
}

export function get(name, data) {
  return new Promise( (resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data,
      success: res => {
        resolve(res)
      },
      fail: err => {
        console.log(err)
      }
    })    
  })
}
