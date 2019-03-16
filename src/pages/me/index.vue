<template>
  <div class="container">

    <button class="loginBtn" v-if="show" @getuserinfo="bindgetuserinfo" open-type="getUserInfo">用户登录</button>       
    <div v-else>
      <div class="userinfo" >
        <img :src="userInfo.avatarUrl" alt="头像"/>
        <p>{{userInfo.nickName}}</p>
      </div>  
      <YearProgress />
      <button @click="scanBook" class="btn">添加图书</button>
    </div>    
  </div>
</template>

<script>
import { showModel, cloudLogin, colSearchData, colAddData } from '@/utils'
import YearProgress from '@/components/YearProgress'

export default {
  data () {
    return {
      userInfo: ''
    }
  },
  computed: {
    show () {
      return this.userInfo === ''
    }
  },
  components: {
    YearProgress
  },
  created () {
    this.userInfo = wx.getStorageSync('userInfo')
    console.log(this.userInfo)
  },
  methods: {
    // 点击登录
    async bindgetuserinfo (e) {
      console.log(e.mp)
      const { mp: { detail: { userInfo } } } = e
      if (!wx.getStorageSync('userInfo')) {
        showModel('登录成功', '恭喜')
        const res = await cloudLogin('login')
        const user = {...userInfo, ...res.result}
        user._id = user.openid
        delete user.event
        this.userInfo = userInfo
        this.userInfo.openid = user.openid
        wx.setStorageSync('userInfo', userInfo)
        const addUser = await colAddData('users', user)
        console.log(addUser)
      }
    },
    addBook (isbn) {
      this.$http.get({url: '/test?isbn=' + isbn}).then(async res => {
        console.log(res)
        const { title, rating: { average }, image, alt, price, publisher, summary } = res
        const tags = res.tags.map(v => {
          return `${v.title} ${v.count}`
        }).join(',')
        const author = res.author.join(',')
        const books = {
          title,
          average,
          image,
          alt,
          price,
          publisher,
          summary,
          tags,
          author,
          isbn,
          openid: wx.getStorageSync('userInfo').openid
        }
        const addBook = await colSearchData('books', books, isbn)
        if (addBook) {
          showModel('添加成功', '图书已录入')
        }
      })
    },
    scanBook () { // 扫码事件
      wx.scanCode({
        success: res => {
          if (res.result) {
            console.log(res.result)
            this.addBook(res.result)
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.container{
  padding: 0 30rpx;
  .loginBtn{
    margin-top: 50%
  }
  .userinfo{
    margin-top: 100rpx;
    text-align: center;
    img{
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
} 
</style>

