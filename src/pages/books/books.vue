<template>
    <div>
        This is books list page
    </div>
</template>

<script>
export default {
  mounted () {
    wx.login({
      success: res => {
        console.log('login success', res)
      },
      fail: err => {
        console.log('login err', err)
      }
    })
  },
  created () {
    console.log('books')
  },
  methods: {

  }
}
</script>

<style>

</style>


