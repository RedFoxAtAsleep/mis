<template>

    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <u-menu v-bind:items="pageMap"></u-menu>
        </el-aside>
        <el-main>
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
<script>
    import {mapState} from "vuex";
    import Tabs from "./Tabs";
    import UMenu from "./UMenu";

    export default {
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                tableData: Array(20).fill(item)
            }
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
