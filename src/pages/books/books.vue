<template>
    <div>
        This is books list page
        <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo">用户授权</button>
    </div>
</template>

<script>
import { showSuccess } from '@/utils'
export default {
  mounted() {
    wx.login({
      success: res => {
        console.log('login success', res)
      },
      fail: err => {
        console.log('login err', err)
      }
    });
        
  },
  created () {
    console.log('books');
  },
  methods: {
    bindgetuserinfo(e){
      console.log(e.mp);
      const { mp: { detail: { userInfo } } } = e
      console.log(userInfo)
      if ( !wx.getStorageSync('userInfo') ) {
        showSuccess('登录成功');
        wx.setStorageSync('userInfo', userInfo);
      }
    }  
  },
}
</script>

<style>

</style>


