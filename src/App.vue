<script>
export default {
  async created() {
    console.log("first app created!!");
    wx.cloud.init();

    // wx.authorize({
    //     // 通过scope指明申请获取哪种类型的权限
    //     scope: 'scope.record',
    //     success() {
    //       // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //       wx.startRecord()
    //     }
    // })

    const db = wx.cloud.database();
    db.collection("counters").get({
      success(res) {
        console.log("数据查询", res);
      }
    });
  }
};
</script>

<style>
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.text-primary {
  color: #ea5a49;
}
.right {
  float: right;
}
.page-title {
  padding-left: 20px;
  line-height: 40px;
  font-size: 14px;
  background-color: #eeeeee;
}
.btn {
  color: #ffffff;
  background-color: #ea5a49;
  margin: 10px 0;
  padding: 0 15px;
  border-radius: 2px;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  width: 100%;
}
.btn:active {
  background-color: #fa5a49;
}
</style>
