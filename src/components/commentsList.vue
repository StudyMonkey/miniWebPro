<template>
  <div>
    <div class="comment-list">
      <div class="page-title">我的评论</div>
      <div class="comment" v-for="comm in commentsList" :key="comm._id" @click="handleCommentClick(comm)">
        <div class="user">
          <div class="inline">
            <img :src="userInfo.avatarUrl" alt="头像" class="avatar" mode="aspectFit">
            {{userInfo.nickName}}
          </div>
          <div class="right">
            {{comm.location || '未知地点'}}
            <span class="text-primary">--</span>
            {{comm.phone || '未知型号'}}
          </div>
        </div>
        <div class="content">{{comm.comment}}</div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  props: {
    commentsList: {
      type: Array,
      default: []
    },
    userInfo: {
      type: Object
    },
    type: {
        type: String
    }
  },
  data() {
    return {
      user: {}
    };
  },
  async created() {
    console.log(this.commentsList);
    const user = await wx.cloud.callFunction({
      name: "userinfo",
      data: {
        openid: this.commentsList[0].openid
      }
    });
    console.log("user", user);
  },
  methods: {
      handleCommentClick(item){
        if ( this.type === 'user' ) {
            wx.navigateTo({
                url: '/pages/detail/main?id='+item.bookid
            })
        }
      }
  },
};
</script>

<style lang="less" scoped>
.comment-list {
  background-color: #eeeeee;
  font-size: 14px;
  .comment {
    background-color: #ffffff;
    margin-bottom: 10px;
    padding: 5px 20px;
    .user {
      .inline {
        display: inline-block;
      }
      .avatar {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .content {
      margin: 10px 0;
    }
  }
}
</style>

