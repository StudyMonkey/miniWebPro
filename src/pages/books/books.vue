<template>
  <div>  
    <Card v-for="(book,index) in books" :key="book.openid" :book="book"/>
    <p class="text-footer" v-if="!more">我是有底线的</p>
  </div>
</template>

<script>
import { colSearchAll } from '@/utils'
import Card from '@/components/card'
export default {
  data () {
    return {
      books: [],
      page: 0,
      more: true
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
    this.getList(true)
  },
  onPullDownRefresh () {
    console.log('下拉')
    this.getList(true)
  },
  onReachBottom () {
    console.log('到底了')
    if ( !this.more ) {
      return false;
    }
    this.getList(false)
  },
  methods: {
    async getList (init) {
      wx.showNavigationBarLoading()
      if (init) {
        this.page = 0
        this.more = true
        const res = await colSearchAll('books', this.page) // 初始化直接覆盖
        this.books = res
        wx.stopPullDownRefresh()
      } else {
        this.page += 1
        const res = await colSearchAll('books', this.page) // 后续请求累加
        if (res.length < 7 && this.page > 0) {
          this.more = false
        }
        this.books = this.books.concat(res)
        console.log(this.books)
      }

      wx.hideNavigationBarLoading()
    }
  }
}
</script>

<style lang="less">
.text-footer{
  text-align: center;
  color: #EA5A49;
  font-size: 12px;
  margin: 5px 0
}
</style>


