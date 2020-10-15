<template>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
        v-model="date_range"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期（不含）"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
        @change="onDateChange">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "DateRangePicker",
  data() {
    return {
      date_range: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    };
  }
};
</script>

<style scoped>

</style>