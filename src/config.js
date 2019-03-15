// 配置项
const API_BASE = "https://api.douban.com/v2/book";
const API_BOOK_SEARCH = `${API_BASE}/search`;
const API_BOOK_DETAIL = `${API_BASE}/:id`;

const bookApi = "https://api.douban.com/v2/book/isbn/"

// module.exports = {
//   API_BOOK_SEARCH: API_BASE + "/search",
//   API_BOOK_DETAIL: API_BASE + "/:id"
// }

const host = 'http://localhost:3999'

const config = {
  host,
  loginUrl: 'http://199447.qcloud.la/user',
  bookApi
}

export default config
