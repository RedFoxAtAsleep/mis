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
        created(){
            axios.get('http://mockjs.com/api/vts/download').then((res) => {
                console.log('Record Like Mock Data', res);
            }).catch((err)=>{console.log(err)});

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
