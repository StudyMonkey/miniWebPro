<template>
  <div>
    <TopSwiper :tops="tops"></TopSwiper>
    <Card v-for="(book,index) in books" :key="book.openid" :book="book"/>
    <p class="text-footer" v-if="!more">我是有底线的</p>
  </div>
</template>

<script>
import { colSearchAll, searchDataOrder } from "@/utils";
import Card from "@/components/card";
import TopSwiper from "@/components/topSwiper";
export default {
  data() {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    };
  },
  components: {
    Card,
    TopSwiper
  },
  async mounted() {
    /*     wx.login({
      success: res => {
        console.log('login success', res)
      },
      fail: err => {
        console.log('login err', err)
      }
    }) */
  },
  created() {
    this.getList(true);
    this.getTops();
  },
  onPullDownRefresh() {
    this.getList(true);
    this.getTops();
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.getList(false);
  },
  methods: {
    async getTops() {
      const db = wx.cloud.database();
      const {
        result: {
          top: { data }
        }
      } = await wx.cloud.callFunction({
        // 云函数名称
        name: "order",
        // 传给云函数的参数
        data: {
          col: "books",
          param: "count",
          limit: 9
        }
      });
      this.tops = data;
      // const res = await searchDataOrder('books', 'count', 'desc');
      // console.log('getTops', res)
      // this.tops = res.data;
    },
    async getList(init) {
      wx.showNavigationBarLoading();
      if (init) {
        this.page = 0;
        this.more = true;
        const {result: { books: { data } }} = await wx.cloud.callFunction({
          name: 'getbooks',
          data: {
            col: 'books',
            page: this.page
          }
        }) 
        console.log('books', data);          
        this.books = data; // 初始化直接覆盖
        wx.stopPullDownRefresh();
      } else {
        this.page += 1;
        const {result: { books: { data } }} = await wx.cloud.callFunction({
          name: 'getbooks',
          data: {
            col: 'books',
            page: this.page
          }
        }) 
        console.log('books', data);
        if (data.length < 10 && this.page > 0) {
          this.more = false;
        }
        this.books = this.books.concat(data); // 后续请求累加
      }

      wx.hideNavigationBarLoading();
    }
  }
};
</script>

<style lang="less">
.text-footer {
  text-align: center;
  color: #ea5a49;
  font-size: 12px;
  margin: 5px 0;
}
</style>


