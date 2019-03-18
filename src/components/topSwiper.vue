<template>
    <div class="swiper">
        <swiper
          :indicator-dots="true"
          indicator-color="#EA5A49"
          :autoplay="true"
          :interval="6000"
          :duration="1000"
          :circular="true"
        >
            <div v-for="(img,ind) in imgUrls" :key="ind">
                <swiper-item>
                    <img 
                      v-for="top in img"
                      :key="top._id"
                      @click="handleImgClick(top._id)"
                      class="slide-image" 
                      mode="aspectFit" 
                      :src="top.image" 
                      alt="图片"
                    >
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>

<script>
export default {
    props: ["tops"],
    computed: {
        imgUrls(){
            const res = this.tops;
            return [res.slice(0,3), res.slice(3,6), res.slice(6)]
        }
    },
    methods: {
        handleImgClick(id){
            wx.navigateTo({
                url: '/pages/detail/main?id='+id
            })
        }
    },
}
</script>

<style lang="less" scoped>
.swiper{
    margin-top: 5px;
    .slide-image{
        width: 33%;
        height: 250rpx;
    }
}
</style>


