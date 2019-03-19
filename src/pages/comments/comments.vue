<template>
  <div>
    <CommentsList type="user" v-if="commentsList.length" :commentsList="commentsList" :userInfo="user"/>
    <div v-if="books.length">
      <Card v-for="(book,index) in books" :key="book._id" :book="book"/>
    </div>
  </div>

</template>

<script>
import CommentsList from '@/components/commentsList'
import Card from '@/components/card'
export default {
  data() {
    return {
      user: {},
      commentsList: [],
      books: []
    }
  },
  components: {
    CommentsList,
    Card
  },
  // 每次页面显示都会检测一次storage，mounted只会挂载一次
  async onShow() {
    if ( !this.user.openid ){
      this.user = wx.getStorageSync('userInfo') || {}
      this.init();
    }
  },
  onPullDownRefresh(){
    this.init()
  },
  methods: {
    init(){
      wx.showNavigationBarLoading();
      this.getComments();
      this.getBooks();
      wx.hideNavigationBarLoading();
    },
    async getBooks(){
      console.log('user openid', this.user.openid);
      const { result: { books: { data } } } = await wx.cloud.callFunction({
        name: 'getbooks',
        data: {
          col: 'books',
          page: 0,
          openid: this.user.openid
        }
      });
      console.log('books data', data);
      this.books = data;
    },
    async getComments(){
    const { result: { comment: { data } } } = await wx.cloud.callFunction({
      name: 'getcomments',
      data: {
        col: 'comments',
        openid: this.user.openid
      }
    })
    console.log(data);
    this.commentsList = data;
    }
  },
  created () {
    console.log('comments')
  }
}
</script>

<style>

</style>


