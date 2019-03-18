// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { col,id } = event
  const {OPENID, APPID} = cloud.getWXContext();
  const detail = await db.collection(col).where({
    _id: id
  }).get();
  return { 
    detail
  }
}