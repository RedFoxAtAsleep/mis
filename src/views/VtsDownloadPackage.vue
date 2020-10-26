<template>
  <div>
    <el-form :inline="true" ref="param" :model="param" label-width="100px">
      <el-form-item label="邮箱">
        <el-input v-model="param.mail"></el-input>
      </el-form-item>
      <el-form-item label="MD5">
        <el-input v-model="param.checked_md5"></el-input>
      </el-form-item>
      <el-form-item label="通知下载日期">
        <el-date-picker
            type="daterange"
            placeholder="选择日期"
            v-model="param.created_range"
            value-format="yyyy-MM-dd"
            format="yyyy 年 MM 月 dd 日"
            range-separator="至"

            :picker-options="pickerOptions"
        >
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-button @click="onSubmit">查询</el-button>
    </el-form>
    <el-table
        v-if="rows && rows.length"
        :data="rows"
        style="width: 100%">
      <el-table-column
          v-for="col in cols"
          :key="col"
          :prop="col"
          :label="field2label[col]"
          width="150">
      </el-table-column>
<!--      <el-table-column-->
<!--          key="report"-->
<!--          prop="report"-->
<!--          :label="field2label['report']"-->
<!--          width="150">-->
<!--        <template slot-scope="scope">-->
<!--          <el-popover-->
<!--              placement="bottom"-->
<!--              title="样本下载报告"-->
<!--              width="300"-->
<!--              trigger="click"-->
<!--              :content="dict2str(scope.row.report.samples)">-->
<!--            <el-tag-->
<!--                slot="reference"-->
<!--                :type="scope.row.report ? 'success' : 'info'"-->
<!--                disable-transitions>-->
<!--              {{scope.row.report? 'report' : 'missed'}}-->
<!--            </el-tag>-->
<!--          </el-popover>-->

<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="downloadSamples(param.mail, scope.row.checked_md5)" type="text" size="small">点击下载样本包</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {simpleQuery} from '@/api/api'
import moment from 'moment'

export default {
  name: "VtsDownloadPackage",
  props: ["mail"],
  data() {
    return {
      param: {
        mail: 'zhaojinhui@intra.nsfocus.com',
        checked_md5: '',
        created_range: ['', ''],
      },
      field2label: {
        "created": "通知下载时间",
        "collected": "下载完成时间",
        "checked_md5": "经过滤的哈希列表文件哈希值",
        "status": "下载状态",
        "final_status": "最终下载状态",
        "report": "下载样本报告"
      },
      rows: [],
      cols_excluded: ['report'],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }],
      }
    }
  },
  computed: {
    queryBody: function () {
      return {
        "select": ["created", "collected", "checked_md5", "status", "final_status", "report"],
        "from": "require",
        "where": {
          "created__gte": this.param.created_range[0],
          "created__lt": this.param.created_range[1],
          "mail": this.param.mail,
          "checked_md5__contains": this.param.checked_md5,
          "final_status__in": ["pending", "success"],
        },
        "group_by": [],
        "aggregate": [],
        "order_by": ["-created"],
        "offset": 0,
        "limit": 10,
        "timezone_offset": new Date().getTimezoneOffset(),
        "datetime_format": "yyyy-MM-dd"
      }
    },
    cols: function (){
      let tmp = {};
      this.queryBody.select.forEach(function (el){tmp[el]=el});
      this.cols_excluded.forEach(function (el){delete tmp[el]});
      return Object.keys(tmp)
    },
  },
  created() {
    const end = moment().add(1, 'day').format("YYYY-MM-DD");
    const start = moment(end).add(-1, 'week').format("YYYY-MM-DD")
    this.param.created_range = [start, end]

    simpleQuery(this.queryBody).then(res => {
      this.rows = res.data || [];
      console.log('res', res);
    }).catch()
  },
  methods: {
    onSubmit() {
      console.log('submit', this.param);
      simpleQuery(this.queryBody).then(res => {
        this.rows = res.data || [];
        console.log('res', res);
      }).catch()
    },
    // dict2str(dict){
    //   Object.keys(dict).join('\n');
    //   return dict
    // },
    downloadSamples(mail, checked_md5){
      console.log(mail, checked_md5)
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
</style>