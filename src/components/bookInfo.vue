<template>
  <div class="bookinfo">
    <div class="thumb">
      <img class="back" mode="aspectFill" :src="info.image" alt="图书图片">
      <img class="img" :src="info.image" mode="aspectFit" alt="上层图片">
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img :src="user.avatarUrl" mode="aspectFit" class="avatar">
      {{user.nickName}}
      <div class="right text-primary">
        {{info.average}}分
        <i-rate :value="score"></i-rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">{{info.price}}</div>
    </div>
    <div class="tags">
      <div class="badge" v-for="(tag,index) in tags" :key="index">{{tag}}</div>
    </div>
    <div class="summary">
      <p v-for="(sum,index) in summary" :key="index">{{sum}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info", "tags", "summary"],
  data() {
    return {
      user: {}
    };
  },
  computed: {
    score() {
      console.log(this.info.average / 2);
      return Math.round(this.info.average / 2);
    }
  },
  async created() {
    console.log(111);
    const {
      result: {
        userInfo: { data }
      }
    } = await wx.cloud.callFunction({
      name: "userinfo",
      data: {
        openid: this.info._openid
      }
    });
    this.user = data[0];
    console.log("info data", data);
  }
};
</script>

<style lang="less">
.bookinfo {
  font-size: 14px;
  .badge {
    display: inline-block;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ea5a49;
    color: #ea5a49;
  }
  .summary {
    margin-top: 10px;
    p {
      text-indent: 2em;
      font-size: 14px;
      padding: 0 15px;
    }
  }
  .right {
    float: right;
  }
  .detail {
    padding: 5px 10px;
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back {
      width: 100%;
      filter: blur(15px);
    }
    .img {
      width: 100%;
      height: 300rpx;
      position: absolute;
      top: 30rpx;
      left: 0;
    }
    .info {
      color: #f1f1f1;
      width: 100%;
      position: absolute;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 20px;
      }
      .author {
        font-size: 16px;
      }
    }
  }
}
</style>


