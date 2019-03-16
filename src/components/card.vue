<template>
  <div>    
    <div class="book-card">
      <div class="thumb">
        <img 
          :src="book.image" 
          class="img"  
          alt="书籍图片" 
          mode="aspectFit"
        />
      </div>
      <div class="detail">
        <div class="row text-primary">
          <div class="right">
            {{book.average}}         
            <i-rate 
              :value="score">
            </i-rate>
          </div>
          <div class="left">
            {{book.title}}
          </div>
        </div>
        <div class="row">
          <div class="right">
            浏览量
          </div>
          <div class="left">
            {{book.author}}
          </div>
        </div>
        <div class="row">
          <div class="left">
            {{book.publisher}}
          </div>
        </div>                  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['book'],
  computed: {
    score () {
      return Math.round(this.book.average / 2)
    }
  }
}
</script>

<style lang="less">
.book-card{
  padding: 5px;
  overflow: hidden;
  margin: 5px 0;
  font-size: 14px;
  .thumb{
    width: 90px;
    height: 90px;
    float: left;
    margin: 0 auto;
    overflow: hidden;
    img{
      max-width: 100%;
      max-height: 100%
    }
  }
  .detail{
    margin-left: 100px;
    .row{
      line-height: 20px;
      margin-bottom: 3px;
    }
    .right{
      float: right;
    }
    .left{
      margin-right: 80px;
    }
  }
}
</style>
