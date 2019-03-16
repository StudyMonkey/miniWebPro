<template>
  <div>  
    <Card v-for="(book,index) in books" :key="book.openid" :book="book"/>
  </div>
</template>

<script>
import { colSearchAll } from '@/utils'
import Card from '@/components/card'
export default {
  data () {
    return {
      books: []
    }
  },
  components: {
    Card
  },
  async mounted () {
    /*     wx.login({
      success: res => {
        console.log('login success', res)
      },
      fail: err => {
        console.log('login err', err)
      }
    }) */
  },
  created () {
    this.getList()
  },
  onPullDownRefresh(){
    wx.showNavigationBarLoading();
    console.log('下拉');
    this.getList()
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
  },
  methods: {
    async getList(){
      this.books = await colSearchAll('books')
      console.log(this.books)
    }
  }
}
</script>

<style>
</style>


