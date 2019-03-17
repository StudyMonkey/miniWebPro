// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event', event)
  const { param } = event
  const top = await db.collection('books').orderBy(param, 'desc').limit(9).get()
  return {
    top
  }
}
