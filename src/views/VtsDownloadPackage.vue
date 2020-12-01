<template>
  <div>
    <el-form :inline="true" ref="param" :model="param" label-width="100px">
      <el-form-item label="邮箱">
        <el-input v-model="param.mail"></el-input>
      </el-form-item>
      <el-form-item label="列表哈希">
        <el-input v-model="param.origin_md5"></el-input>
      </el-form-item>
      <el-form-item label="提交日期">
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
      <el-popover
          placement="bottom"
          width="500px"
          v-model="visible">
        <ol>
          <li><p>查询匹配该邮箱的请求</p></li>
          <li><p>查询列表哈希值包含该字符串的请求，列表哈希值为是提交的列表文件的哈希值</p></li>
          <li><p>查询日期范围左闭右开</p></li>
          <li><p>查询结果为可下载的样本包</p></li>
        </ol>
        <el-button type="text" slot="reference" style="margin-left: 10px"><i class="el-icon-info"></i>查看帮助</el-button>
      </el-popover>
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
      <el-table-column
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.final_status === 'success'" @click="sendUrl2Browser(param.mail, scope.row.origin_md5, scope.row.target)" type="text" size="small">下载样本包</el-button>
<!--          <el-button @click="downloadPackage(param.mail, scope.row.checked_md5)" type="text" size="small">点击下载样本包</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import moment from 'moment'
import api from '@/api/api'
// import PopoverKvTable from "@/views/PopoverKvTable";

export default {
  name: "VtsDownloadPackage",
  props: ["mail"],
  data() {
    return {
      param: {
        mail: '@intra.nsfocus.com',
        origin_md5: '',
        created_range: ['', ''],
      },
      field2label: {
        "created": "提交时间",
        "note": "备注",
        "collected": "下载完成时间",
        "origin_md5": "原列表哈希",
        "checked_md5": "VT列表哈希",
        "status": "下载阶段",
        "final_status": "下载状态",
        "report": "下载样本报告",
        "target": "期望返回",
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
        "select": ["origin_md5", "note", "target", "final_status", "created", "collected"],
        "from": "require",
        "where": {
          "created__gte": this.param.created_range[0],
          "created__lt": this.param.created_range[1],
          "mail": this.param.mail,
          "checked_md5__contains": this.param.checked_md5,
          "origin_md5__contains": this.param.origin_md5,
          "final_status__in": ["pending", "success"],
          "target__in": ["package_vt", "package"],
          "expired": 0,
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

    api.simpleQuery(this.queryBody).then(res => {
      this.rows = res.data.data || [];
      console.log('res', res);
    }).catch()
  },
  methods: {
    onSubmit() {
      console.log('submit', this.param);
      api.simpleQuery(this.queryBody).then(res => {
        this.rows = res.data.data || [];
        console.log('res', res);
      }).catch()
    },
    // dict2str(dict){
    //   Object.keys(dict).join('\n');
    //   return dict
    // },
    sendUrl2Browser(mail, origin_md5, target){
      let link = document.createElement('a');
      let url = 'http://10.51.10.68:8000/vts/download/?'+'mail='+mail+'&'+'origin_md5='+origin_md5+'&'+'target=' + target;
      console.log(url);
      let filename = 'package.7z';
      link.href=url;
      link.download = filename;
      link.click()
    },
    downloadPackage(mail, checked_md5){
      api.downloadPackage({
        params:{mail: mail, checked_md5: checked_md5},
        headers: {},
        responseType: "blob",
      }).then(response => {
        let url = window.URL.createObjectURL(response.data);
        console.log("url", url)
        let link = document.createElement("a");
        document.body.appendChild(link);
        link.style.display = 'none'
        link.href = url;
        // link.download = 'package.7z';
        // link.setAttribute('download', filename)
        link.click();
        window.URL.revokeObjectURL(url);
      }).catch(err=>console.log(err))
    },
    kv2rows(obj, col_k, col_v){
      // [{sample_hash: 'dafd', sample_status: 'faf'}, {sample_hash: 'dafd', sample_status: 'faf'}]
      let rows = [];
      for(let k in obj){
        let tmp = {}
        tmp[col_k] = k;
        tmp[col_v] = this.obj[k]
        rows.push(tmp)
      }
      return rows
    }
  },
  mounted() {
  },
  components:{
    // PopoverKvTable,
  }
}
</script>
<style scoped>
</style>