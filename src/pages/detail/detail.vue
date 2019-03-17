<template>
    <div>
        This is detail page{{bookid}}
    </div>
</template>

<script>
import { searchDetail, modifyData } from '@/utils'
export default {
    data() {
        return {
            bookid: ''
        }
    },
    async mounted() {
        this.bookid = this.$root.$mp.query.id;       
        const { data } = await searchDetail(this.bookid);
        let count = data[0].count;
        count += 1;
        const res = await modifyData('books', this.bookid, {count});
        console.log(res);
    },
}
</script>

<style lang="less" scoped>

</style>


