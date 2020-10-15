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
        <el-button
                class="floating"
                type="primary"
                icon="el-icon-back"
                circle
                @click="goto({name: 'Navigation'})">
        </el-button>
    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    export default {
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
            // $route: function (to) {
            //     console.table(to);
            //     let uid = to.params.uid;
            //     this.src = this.indices[uid]['src']
            // }
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
                return this.indices[this.uid]['src']
            }
        },
        methods:{
            goto: function (routeObj) {
                this.$router.push(routeObj);
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    html, body, div {
        width: 100%;
        height: 100%;
    }
    .floating {
        position: fixed;
        bottom: 50px;
        right: 50px;
    }
</style>
