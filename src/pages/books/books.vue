<template>
    <div>
        This is books list page
        <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">
            获取用户信息
        </button>
    </div>
</template>

<script>
export default {
  created () {
    console.log('书籍页面加载');

    function onGotUserInfo(e){
        console.log(e.detail.errMsg)
        console.log(e.detail.userInfo)
        console.log(e.detail.rawData)        
    }
  },
  methods: {
    onGotUserInfo: function (e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.userInfo)
        console.log(e.detail.rawData)
    },
  },
}
</script>

<style>

</style>


