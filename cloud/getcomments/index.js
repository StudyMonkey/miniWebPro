// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { col, bookid, openid } = event;
  let comment;
  if ( !bookid ) {
    comment = await db.collection(col).where({
      openid
    }).get();
  } else {
    comment = await db.collection(col).where({
      bookid
    }).get();    
  }

  return {
    comment
  }
}