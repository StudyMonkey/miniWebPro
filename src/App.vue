<script>
import { get } from './utils'
import qcloud from 'wafer2-client-sdk'
import config from './config'

export default {
  async created () {
    console.log('first app created!!')
    wx.cloud.init();

    // 设置登录地址
    qcloud.setLoginUrl('https://199447.qcloud.la/login');
    qcloud.login({
        success: function (userInfo) {
            console.log('登录成功', userInfo);
        },
        fail: function (err) {
            console.log('登录失败', err);
        }
    }); 
    
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
.container {
  background-color: #cccccc
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
