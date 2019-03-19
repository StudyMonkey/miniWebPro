// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { col, page, openid } = event;
  console.log(page, openid);
  let books;
  if (!openid ) {
    books = await db.collection(col).limit(10).skip(page * 10).get({})
  } else {
    books = await db.collection(col).where({
      _openid: openid
    }).limit(10).skip(page * 10).get({})
  }

  return {
    books
  }
}