<template>
  <div class="u-tabs">
    <el-tabs class="u-el-tabs"
             v-model="selectedLocal"
             type="card"
             closable
             @tab-remove="removeTab">
      <el-breadcrumb
          v-if="breadcrumb"
          separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
            v-for="item in breadcrumb"
            :key="item"
        >
          {{ item in indices ? indices[item]['label'] : menus[item]['label'] }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div style="height: 20px"></div>
      <el-tab-pane
          v-for="index in loadedIndices"
          :key="index['uid']"
          :label="index['label']"
          :name="index['uid']"
          :closable="index['closable']">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {mapState, mapGetters, mapMutations} from "vuex";

export default {
  name: "Tabs",
  data() {
    return {
      selectedLocal: '',
    }
  },
  watch: {
    // 同步代表选中标签页的全局数据项和局部数据项
    'selectedGlobal': function (now, pre) {
      // 以点击标签页以外的方式切换标签页
      // 全局变 > 局部变
      console.log('selectedGlobal', now, pre);
      if (now in this.indices) {
        this.selectedLocal = now;
      } else {
        this.selectedLocal = ''
      }

    },
    'selectedLocal': function (now, pre) {
      // 在监听x中自然不能使用x，而是使用x_now和x_pre
      // 在以点击标签页切换标签页的情况下触发
      // 局部变 > 全局变
      console.log('selectedLocal', now, pre);
      this.$store.commit('select', now);
      if (now in this.indices) {
        this.$router.push(this.indices[now]['route']).then().catch();
      } else {
        this.$router.push({name: 'Navigation'}).then().catch();
      }
    }

  },
  computed: {
    ...mapState({
      // indices: state => state.indices,
      selectedGlobal: state => state.selected,
      indices: state => state.indices,
      menus: state => state.menus,
    }),
    ...mapGetters([]),
    loadedIndices: function () {
      let indices = this.indices;
      let tmp = [];
      for (let uid of Object.keys(indices)) {
        if (indices[uid]['loaded'] === true) {
          tmp.push(indices[uid]);
        }
      }

      // 新增或减少tab是会重新计算需要加载的tab
      // 但是tmp的顺序并非是tab的先后顺序，而是Object.keys中的顺序
      // init 场景
      // activate 场景
      // remove 场景
      console.log(tmp);
      if (tmp.length > 0 && !this.selectedGlobal) {
        this.select(tmp[tmp.length - 1]['uid'])
      }

      return tmp
    },
    breadcrumb: function () {
      let tmp = [];
      if (!(this.selectedGlobal in this.indices)) {
        return tmp
      }
      let path = this.indices[this.selectedGlobal]['path'];
      for (let n = 1; n <= path.length; n++) {
        tmp.push(path.slice(0, n).join('-'))
      }
      return tmp
    },
  },
  methods: {
    ...mapMutations({
      inverseLoaded: 'inverseLoaded',
      select: 'select',
    }),
    removeTab(uid) {
      if (this.selectedLocal === uid) {
        for (let i in this.loadedIndices) {
          let obj = this.loadedIndices[i];
          if (this.selectedLocal === obj['uid']) {
            let nextObj = this.loadedIndices[i + 1] || this.loadedIndices[i - 1];
            if (nextObj) {
              this.selectedLocal = nextObj['uid']
            } else {
              this.selectedLocal = '';
            }
            break;
          }
        }
      }
      this.$store.commit('inverseLoaded', uid);
    }
  }
}
</script>
<style>
.u-tabs {
}

.u-tabs .el-tabs--card {
}

.u-tabs .el-breadcrumb .el-breadcrumb__item {

}

.u-tabs .el-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner {
}

.u-tabs .el-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner {
  background-color: #47475B;
  color: #FFFFFF;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 20%;
}

.u-tabs .el-tabs--card .el-tabs__header {
  margin: 0;
  border: 0;
  border-image-width: 0;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}

.u-tabs .el-tabs--card .el-tabs__header .el-tabs__nav-wrap {

}

/*标签横道*/
.u-tabs .el-tabs--card .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll {
  padding: 0;
}

/*所有标签*/
.u-tabs .el-tabs--card .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav {
  border-image-width: 0;
  border-right-width: 0;
  border-left-width: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-top-width: 0;
  background-color: ;
}

/*单标签*/
.u-tabs .el-tabs--card .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item {
  border-bottom-width: 0;
  border-left-width: 1px;
  padding-left: 20px;
  padding-right: 20px;

}

.u-tabs .el-tabs--card .el-tabs__content {
  margin: 0;
  border: 0;
  padding-left: 20px;
  padding-right: 20px;
}

</style>
