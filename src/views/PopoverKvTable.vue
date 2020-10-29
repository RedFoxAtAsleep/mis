<template>
  <el-popover
      placement="right"
      width="400"
      :trigger="trigger">
    <el-table :data="rows">
      <el-table-column
          :key="col_k['name']"
          :prop="col_k['name']"
          :label="col_k['label']"
      >
      </el-table-column>
      <el-table-column
          :key="col_v['name']"
          :prop="col_v['name']"
          :label="col_v['label']"
      >
      </el-table-column>
    </el-table>
    <el-tag
        :type="obj ? 'success' : 'info'"
        disable-transitions>
      {{obj? 'report' : 'missed'}}
    </el-tag>
  </el-popover>
</template>

<script>
export default {
  name: "PopoverKvTable",
  props: ['obj', 'col_k', 'col_v', 'trigger'],
  data() {
    return {};
  },
  created() {

  },
  computed:{
    rows: function (){
      let rows = [];
      for(let k in this.obj){
        let tmp = {}
        tmp[this.col_k] = k;
        tmp[this.col_v] = this.obj[k]
        rows.push(tmp)
      }
      return rows
    },
  }
};
</script>

<style scoped>

</style>