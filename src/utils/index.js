// 工具函数库

import config from '../config'
wx.cloud.init()

function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method: method,
      data: data,
      headers: {
        'content-type': 'application/json' // 默认转为json格式
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading()
        reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

function post (obj) {
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

export function showModel (title, content) {
  wx.showModal({
    title,
    content
  })
}
/*
  数据库 查询所有数据方法
*/
export function colSearchAll (col) {
  const db = wx.cloud.database()
  return new Promise((resolve, reject) => {
    db.collection(col).get({}).limit(4).then(res => {
      console.log(res)
      resolve(res.data)
    })
  })
}
/*
  数据库 查询书籍是否重复数据方法
*/
export function colSearchData (col, data, condition) {
  const db = wx.cloud.database() // 数据库初始化
  return new Promise((resolve, reject) => {
    db.collection(col).where({
      isbn: condition
    }).get().then(res => {
      console.log('res', res)
      if (res.data.length === 0) {
        resolve(colAddData(col, data))
      } else {
        reject(showModel('添加失败', '书籍已存在'))
      }
    })
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
