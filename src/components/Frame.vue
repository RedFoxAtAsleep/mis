<template>

    <el-container style="height: 900px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 100%">
            <u-menu v-bind:items="pageMap"></u-menu>
        </el-aside>
        <el-main class="padding" style="height: 100%">
            <tabs></tabs>
        </el-main>
    </el-container>
</template>
<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
<style scoped>
.padding {
  padding: 0;
}

</style>
<script>
    import {mapState} from "vuex";
    import Tabs from "./Tabs";
    import UMenu from "./UMenu";

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapState({
                pageMap: state => state.pageMap,
            })
        },
        components: {
            Tabs,
            UMenu
        }
    };
</script>
