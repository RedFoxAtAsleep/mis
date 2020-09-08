<template>
    <div>
        <u-menu-end
                v-if="item['children'].length === 0"
                v-show="item['show']"
                :index="item['uid']"
                :uid="item['uid']"
                :path="item['path']"
                :key="item['uid']"
                :label="item['label']"
                :name="item['label']"
        >
            {{item['name']}}
        </u-menu-end>
        <el-submenu
                v-else
                :index="item['uid']"
                :key="item['uid']"
                :label="item['label']"
                :name="item['label']"
        >
            <template slot="title"><i class="el-icon-message"></i>{{item['label']}}</template>
            <u-menu-item
                    v-for="child in item['children']"
                    v-bind:key="child['uid']"
                    v-bind:item="child">
            </u-menu-item>
        </el-submenu>
    </div>
</template>

<script>
    import UMenuItem from "./UMenuItem";
    import UMenuEnd from "./UMenuEnd";
    export default {
        name: "UMenuItem",
        data(){
            return {}
        },
        props:['item'],
        components:{
            UMenuEnd,
            UMenuItem,
        },
    }
</script>

<style scoped>

</style>
