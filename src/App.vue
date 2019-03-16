<script>

export default {
  async created () {
    console.log('first app created!!')
    wx.cloud.init()

    // wx.authorize({
    //     // 通过scope指明申请获取哪种类型的权限
    //     scope: 'scope.record',
    //     success() {
    //       // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //       wx.startRecord()
    //     }
    // })

    const db = wx.cloud.database()
    db.collection('counters').get({ success (res) {
      console.log('数据查询', res)
    } })
  }
}
</script>

<style>
.text-primary{
  color: #EA5A49
}
.btn{
  color: #ffffff;
  background-color: #EA5A49;
  margin: 10px 0;
  padding: 0 15px;
  border-radius: 2px;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  width: 100%
}
.btn:active{
  background-color: #FA5A49
}
</style>
