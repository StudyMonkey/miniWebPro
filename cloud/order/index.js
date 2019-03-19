// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { col, param, limit, order = "desc" } = event;
  const top = await db
    .collection(col)
    .orderBy(param, order)
    .limit(limit)
    .get();
  return {
    top
  };
};
