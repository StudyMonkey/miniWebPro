import Vue from 'vue'
import Book from './books'

const app = new Vue(Book)
app.$mount()

export default{
  'navigationBarTitleText': '书籍列表'
}
