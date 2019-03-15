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
import { showSuccess, cloudLogin, colAddData } from '@/utils'
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
        showSuccess('登录成功')
        wx.setStorageSync('userInfo', userInfo)
        this.userInfo = userInfo
        const res = await cloudLogin('login')
        const user = {...userInfo, ...res.result}
        user._id = user.openid
        delete user.event
        const addRes = await colAddData('users', user)
        console.log(addRes)
      }
    },
    addBook(isbn){
      this.$http.get({url: isbn}).then( res => {
        console.log(res)
      })
    },
    scanBook () { // 扫码事件
      wx.scanCode({
        success: res => {
          if ( res.result ) {
            console.log(res.result);
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

