import Vue from 'vue'
import Comments from './comments'

const app = new Vue(Comments)
app.$mount()

export default {
  'navigationBatTitleText': '评论列表'
}
