<template>
    <div class="u-menu-item">
        <el-menu-item
                v-if="item['type'] === 'link'"
        >
            <template slot="title">
                <i :class="item['icon']"></i>
                <a
                        class="u-menu-link"
                        :href="item['src']"
                        target="_blank">{{item['label']}}
                </a>
            </template>
        </el-menu-item>
        <u-menu-end
                v-else-if="item['children'].length === 0"
                v-show="item['show']"
                :index="item['uid']"
                :uid="item['uid']"
                :key="item['uid']"
                :label="item['label']"
                :name="item['name']"
        >
            <template><i :class="item['icon']"></i>{{item['label']}}</template>

        </u-menu-end>
        <el-submenu
                v-else
                :index="item['uid']"
                :key="item['uid']"
                :label="item['label']"
                :name="item['name']"
        >
            <template slot="title"><i :class="item['icon']"></i>{{item['label']}}</template>
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
        data() {
            return {}
        },
        props: ['item'],
        created() {
        },
        components: {
            UMenuEnd,
            UMenuItem,
        },

    }
</script>

<style>
    .u-menu-item {
        background-color: #47475B;
        color: #FFFFFF;
    }

    .u-menu-item a.u-menu-link:link {
        color: #FFFFFF;
        text-decoration:none;
    }

    .u-menu-item a.u-menu-link:visited {
    }

    .u-menu-item a.u-menu-link:hover {
    }

    .u-menu-item a.u-menu-link:active {
    }

    .u-menu-item .el-submenu {

    }

    .u-menu-item .el-submenu__title {
        background-color: #47475B;
        color: #FFFFFF;
        padding-right: 100px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
    }

    .u-menu-item .el-submenu .el-menu-item {
        background-color: #47475B;
        color: #FFFFFF;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
    }
</style>
