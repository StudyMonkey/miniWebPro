// 工具函数库

import config from '../config'
wx.cloud.init()

function request(url, method, data, header = {}) {
  wx.showLoading({
      title: '加载中' 
  })
  return new Promise((resolve, reject) => {
      wx.request({
          url: config.host+url,
          method: method,
          data: data,
          headers: {
              'content-type': 'application/json' // 默认转为json格式
          },
          success: function(res) {
              wx.hideLoading();
              resolve(res.data)
          },
          fail: function(error) {
              wx.hideLoading();
              reject(false)
          },
          complete: function() {
              wx.hideLoading();
          }
      })
  })
}

function get(obj) {
  return request(obj.url, 'GET', obj.data)
}

function post(obj) {
  return request(obj.url, 'POST', obj.data)
}

export function cloudLogin (name, data) {
  return new Promise((resolve, reject) => {
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

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
/*
  数据库 查询数据方法
*/
export function colSearchData (col, openId, data) {
  const db = wx.cloud.database() // 数据库初始化
  db.collection(col).doc(openId).get().then(res => {
    console.log('res', res)
    if (res && res.data) {
      return false
    } else {
      colAddData(col, data)
    }
  })
}

/*
  数据库添加数据方法
*/
export function colAddData (col, data) {
  const db = wx.cloud.database() // 数据库初始化
  return new Promise((resolve, reject) => {
    db.collection(col).add({
      data: { ...data },
      success (res) {
        resolve(res)
      }
    })
  })
}

export default{
  request,
  get,
  post
}
