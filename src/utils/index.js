// 工具函数库

import config from "../config";
wx.cloud.init();

function request(url, method, data, header = {}) {
  wx.showLoading({
    title: "加载中"
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method: method,
      data: data,
      headers: {
        "content-type": "application/json" // 默认转为json格式
      },
      success: function(res) {
        wx.hideLoading();
        resolve(res.data);
      },
      fail: function(error) {
        wx.hideLoading();
        reject(false);
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  });
}

function get(obj) {
  return request(obj.url, "GET", obj.data);
}

function post(obj) {
  return request(obj.url, "POST", obj.data);
}

export function cloudLogin(name, data) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data,
      success: res => {
        resolve(res);
      },
      fail: err => {
        console.log(err);
      }
    });
  });
}

export function showModel(title, content) {
  wx.showModal({
    title,
    content
  });
}
/*
  某数据库查询全部数据并排序操作方法
  col 数据库
  param 查询条件
  order 排序规则
*/
export function searchDataOrder(col, param, order) {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db
      .collection("books")
      .orderBy(param, order)
      .limit(9)
      .get({})
      .then(res => {
        resolve(res);
      });
  });
}
/*
  详情页查询具体某条数据方法
  id _id查询条件
*/
export function searchDetail(id) {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db
      .collection("books")
      .where({
        _id: id
      })
      .get({})
      .then(res => {
        resolve(res);
      });
  });
}
/*
  数据库 修改某数据库的单条数据方法
  col 数据库
  id 对应_id字段
  some 对应修改字段 type: Object
*/
export function modifyData(col, id, some) {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db
      .collection(col)
      .doc(id)
      .update({
        data: {
          ...some
        },
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        }
      });
  });
}
/*
  数据库 查询所有数据方法
  col 数据库
  page 分页 每页7条
*/
export function colSearchAll(col, page) {
  const db = wx.cloud.database();
  return new Promise((resolve, reject) => {
    db
      .collection(col)
      .limit(7)
      .skip(page * 7)
      .get({})
      .then(res => {
        resolve(res.data);
      });
  });
}
/*
  数据库 查询书籍是否重复数据方法
  col 数据库
  data 添加到数据库的字段及值  type: Object
  condition isbn码
*/
export function colSearchData(col, data, condition) {
  const db = wx.cloud.database(); // 数据库初始化
  return new Promise((resolve, reject) => {
    db
      .collection(col)
      .where({
        isbn: condition
      })
      .get()
      .then(res => {
        if (res.data.length === 0) {
          resolve(colAddData(col, data));
        } else {
          reject(showModel("添加失败", "书籍已存在"));
        }
      });
  });
}
/*
  数据库添加数据方法
  col 数据库
  data 添加的字段及值 type: Object
*/
export function colAddData(col, data) {
  const db = wx.cloud.database(); // 数据库初始化
  return new Promise((resolve, reject) => {
    db.collection(col).add({
      data: { ...data },
      success(res) {
        resolve(res);
      }
    });
  });
}

export default {
  request,
  get,
  post
};
