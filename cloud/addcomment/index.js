// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {

  const { col, data } = event;
  const { OPENID, APPID } = cloud.getWXContext();

  data.appid = APPID;
  data.openid = OPENID;

  const comment = await db.collection(col).add({
    data: { ...data }
  })

  return {
    comment
  }
}