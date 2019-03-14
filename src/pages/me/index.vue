<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userInfo.avatarUrl" alt="头像"/>
      <p>{{userInfo.nickName}}</p>
    </div>
    <YearProgress />
    <button @click="scanBook" class="btn">添加图书</button>
    
  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress'
export default {
  data(){
    return {
      userInfo: {}
    }
  },
  components: {
    YearProgress
  },
  created () {
    this.userInfo = wx.getStorageSync('userInfo');
    console.log(this.userInfo)
  },
  methods: {
    scanBook(){ // 扫码事件
      wx.scanCode({
        success: res => {
          console.log(res)
        }
      })
    }
  },
}
</script>

<style lang="less">
.container{
  padding: 0 30rpx;
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

