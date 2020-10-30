<template>
    <div :style="{width: availWidth, height: availHeight}">
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
      name:'ComponentIndex',
        data() {
            return {
                // src: '',
                window: {
                    height: this.availHeight,
                    width: this.availWidth
                }
            }
        },
        props:[],
        watch:{},
        computed:{
            availHeight: function () {
                return window.screen.availHeight;
            },
            availWidth: function () {
                return window.screen.availWidth;
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
