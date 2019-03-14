<script>
import { get } from './utils'
import qcloud from 'wafer2-client-sdk'
import config from './config'

export default {
  async created () {
    console.log('first app created!!')
    wx.cloud.init()

    // 设置登录地址
/*     qcloud.setLoginUrl('https://7465-testwebapp-ec2ddf-1258793997.tcb.qcloud.la');
    const session = qcloud.Session.get();
    console.log(session);
    qcloud.login({
        success: function (userInfo) {
            console.log('登录成功', userInfo);
        },
        fail: function (err) {
            console.log('登录失败', err);
        }
    });  */

    wx.authorize({
        // 通过scope指明申请获取哪种类型的权限
        scope: 'scope.record',
        success() {
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          wx.startRecord()
        }
    })
    
    // qcloud.request({
    //     url: 'http://199447.qcloud.la/user',
    //     success: function (response) {
    //         console.log(response);
    //     },
    //     fail: function (err) {
    //         console.log(err);
    //     }
    // });

    const res = await get( 'login' );
    console.log(res.result);

    const db = wx.cloud.database();
    db.collection('counters').get({ success(res){
      console.log('数据查询', res)
    } })

    

  }
}
</script>

<style>
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
