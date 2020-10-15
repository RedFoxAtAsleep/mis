<template>
    <div>
      <el-menu-item
          v-if="item['type'] === 'link'"
      >
        <template slot="title"><i :class="item['icon']"></i><a :href="item['src']" target="_blank">{{item['label']}}</a></template>
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

.el-menu-item {
  text-align: left;
}
</style>
