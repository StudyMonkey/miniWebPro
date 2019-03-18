<template>
    <div>
        <BookInfo :info="info" :summary="summary" :tags="tags" />
        <CommentsList :commentsList="commentsList" />
        <div class="comment">
            <textarea 
                v-model="comment" 
                placeholder="请输入图书短评" 
                :maxlength="100" 
                class="textarea"
            ></textarea>
            <div class="location">
                地理位置:
                <switch color="#EA5A49" :checked="location" @change="getLoc"></switch>
                <span class="text-primary">{{location}}</span>
            </div>
            <div class="phone">
                手机型号:
                <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
                <span class="text-primary">{{phone}}</span>
            </div>
            <button class="btn" @click="addComment">评论</button>
        </div>
    </div>
</template>

<script>
import { searchDetail, modifyData, showModel } from '@/utils'
import BookInfo from '@/components/bookInfo'
import CommentsList from '@/components/commentsList' 
export default {
    data() {
        return {
            bookid: '',
            comment: '',
            commentsList: [],
            location: '',
            phone: '',
            info: {},
            tags: [],
            summary: []
        }
    },
    components: {
        BookInfo,
        CommentsList
    },
    async mounted() {
        this.bookid = this.$root.$mp.query.id;  
        /**
         * 调用detail云函数
         * 获取books集合里的单条数据
         */
        const { result: { detail: { data } } } = await wx.cloud.callFunction({
            name: 'detail',
            data: {
                col: 'books',
                id: this.bookid
            }
        }) 
        console.log('data', data);  
        this.info = data[0];   
        this.tags = data[0].tags.split(',');
        this.summary = data[0].summary.split('\n');
        // const { data } = await searchDetail(this.bookid);
        // console.log('data', data);
        // 设置头部文字
        wx.setNavigationBarTitle({
            title: data[0].title
        })
        // count累加
        let count = data[0].count;
        count += 1;
        const res = await modifyData('books', this.bookid, {count});
        console.log(res);
        // 获取评论
        this.getComments();
    },
    methods: {
        /*
         * 获取评论函数
         */
        async getComments(){
            const { result: { comment: { data } } } = await wx.cloud.callFunction({
                name: 'getcomments',
                data: {
                    col: 'comments',
                    bookid: this.bookid
                }
            })
            console.log('comments', data)
            this.commentsList = data;
        },
        /*
         * 点击发表评论事件处理
         * 数据添加到comments集合
         */
        async addComment(){
            if ( !this.comment ) {
                return false
            }
            // 评论 手机 位置 图书 用户
            const data = {
                bookid: this.bookid,
                comment: this.comment,
                phone: this.phone,
                location: this.location
            }
            console.log(data);
            
            const { result: { comment: { _id } } } = await wx.cloud.callFunction({
                name: 'addcomment',
                data: {
                    col: 'comments',
                    data
                }
            })

            if ( _id ) {
                showModel('成功', '消息评论成功');
            } else {
                showModel('失败', '消息评论失败');
            }
            this.comment = ''
        },
        /*
         * 切换switch获取手机型号
         */
        getPhone(e){
            console.log(e.target.value);
            if ( e.target.value ) {
                const phoneInfo = wx.getSystemInfoSync() // 同步获取
                this.phone = phoneInfo.model
                console.log(phoneInfo); 
            } else {
                // 没选中
                this.phone = ''
            }
        },
        /*
         * 切换switch获取地址
         */        
        getLoc(e){
            if ( e.target.value ) {
                this.location = '火星'
            } else {
                this.location = ''
            }
            
        }
    },
    created() {
        
    },
}
</script>

<style lang="less" scoped>
.comment{
    margin-top: 10px;
    .textarea{
        width: 750rpx;
        height: 200rpx;
        background: #eeeeee;
        padding: 10rpx;
    }
    .location{
        margin-top: 10px;
        padding: 5px 10px;
    }
    .phone{
        margin-top: 10px;
        padding: 5px 10px;
    }
}
</style>


