<template>
    <div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "MockDashboard",
        data(){
            return {

            }
        },
        async created(){
            let res = await axios.get('http://mockjs.com/api/vts/download');
            console.table('Record Like Mock Data', res.data);

            this.$http.get('/vts/type').then(res=>{
                console.log('Kv Like Mock Data', res)
            }).catch((err)=>{console.log(err)})


            // get带参数，url匹配不到，除非使用正则表达的url
            // this.$http.get('/posts', {params:{num:3}}).then(res=>{
            //     console.log('mockdata1',res);
            // });

            // this.$http.post('/news',{num:3}).then(res=>{
            //     console.log('mockdata2',res);
            // })
        },
        mounted() {
        },
        computed:{},
        methods:{},
    }

</script>

<style scoped>

</style>
