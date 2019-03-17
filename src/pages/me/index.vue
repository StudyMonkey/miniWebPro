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
      userInfo: '',
/*       inputIsbn: [ '9789573430117', '9787203106562', '9787519203887', '9787208068728', '9787544700108',
        '9787544754767', '9787510010361', '9787800398926', '9787519205683', '9787805677989', '9787121172335', '9787532744848',
        '9787560929064', '9787115422699', '9787115249999', '9787121104985', '9787010009230', '9787010009247', '9787115352460',
        '9787115437303', '9787121331565', '9787508051000', '9787121139512', '9787010009148', '9787508665849', '9787536692930',
        '9787536693968', '9787229030933', '9787115282828', '9787115293800', '9787115351531', '9787563391813', '9787539957173',
        '9787108026040', '9787121060748', '9787532733095', '9787121095450', '9787508622828', '9787111213826', '9787121148750',
        '9787115276117', '9787115179289', '9787115428028', '9789573490104', '9787121075391', '9787540471682', '9787540446765',
        '9787540449834', '9789573469155', '9787501156559', '9787121232459', '9787121016097', '9787115178503', '9787121097713',
        '9787121192821', '9787115328670', '9787302096139', '9787121213366', '9787115361530', '9787115239969', '9787115239075'
      ] */
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
/*     this.inputIsbn.map( isbn => {
      this.commonAddBook(isbn)
    }) */
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
      this.commonAddBook(isbn)
    },
    async commonAddBook (isbn) {
      const res = await this.$http.get({url: '/test?isbn=' + isbn})
      console.log(res)
      const { title, rating: { average }, image, alt, price, publisher, summary } = res
      const tags = res.tags.map(v => {
        return `${v.title} ${v.count}`
      }).join(',')
      const author = res.author.join(',')
      const books = {
        count: 0,
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

