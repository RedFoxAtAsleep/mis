<template>
    <div>
        <el-menu
                :unique-opened="true"
                :default-active="'menu-'+this.selectedPath"
        >
            <u-menu-item
                    v-for="item in items"
                    v-bind:key="item['uid']"
                    v-bind:item="item"
            >
            </u-menu-item>
        </el-menu>
    </div>


</template>

<script>
    import {mapState} from "vuex";
    import UMenuItem from "./UMenuItem";
    export default {
        name: "UMenu",
        data(){
            return {}
        },
        props:['items'],
        mounted(){
        },
        computed: {
            ...mapState({
                selectedPath: state => state.selectedPath
            })
        },
        methods: {
            subMenus: function (items) {
                return items.filter(
                    function (item) {
                        return item['children'] !== []
                    }
                )
            },
            menuEnds: function (items) {
                console.log(items);
                return items.filter(
                    function (item) {
                        return item['children'].length === 0
                    }
                )
            },
        },
        components: {
            UMenuItem,
        }
    }
</script>

<style scoped>

</style>
