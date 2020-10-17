<template>
    <div>
        <iframe
                :src="src"
                frameborder="0"
                scrolling="auto"
                :width="availWidth"
                :height="availHeight"
        >
        </iframe>
    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
        name: "Iframe",
        data() {
            return {
                // src: '',
                window: {
                    height: this.availHeight,
                    width: this.availWidth
                }
            }
        },
        props:['uid'],
        watch:{
            // $route(to){
            //     let uid = to.params.uid;
            //     this.src = this.indices[uid]['src'];
            // },
        },
        computed:{
            ...mapState({
                indices: state => state.indices,
            }),
            ...mapGetters([
                // 'indices'
            ]),
            availHeight: function () {
                return window.screen.availHeight;
            },
            availWidth: function () {
                return window.screen.availWidth;
            },
            src: function () {
                // let uid = this.$route.params.uid;
                return this.indices[this.uid]['src']
            }
        },
        methods:{
            // goBack: function () {
            //     this.$router.push({name: 'Navigation'});
            // }
        }
    }
</script>

<style scoped>


</style>
