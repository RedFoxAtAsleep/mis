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

      <el-table-column
          key="report"
          prop="report"
          :label="field2label['report']"
          width="150">
        <template slot-scope="scope">
          <el-popover
              placement="bottom"
              title="标题"
              width="200"
              trigger="click"
              :content="JSON.stringify(scope.row.report)">
            <el-tag
                slot="reference"
                :type="scope.row.report ? 'success' : 'info'"
                disable-transitions>
              {{scope.row.report? 'report' : 'missed'}}
            </el-tag>
          </el-popover>
        </template>
      </el-table-column>


<!--      <el-table-column-->
<!--          key="report"-->
<!--          prop="report"-->
<!--          :label="field2label['report']"-->
<!--          width="150">-->
<!--        <template slot-scope="scope">-->

<!--          <el-popover-->
<!--              placement="bottom"-->
<!--              title="标题"-->
<!--              width="200"-->
<!--              trigger="click"-->
<!--              :content="JSON.stringify(scope.row.report)">-->
<!--            <el-table :data="kv2rows(scope.row.report ||{},'sample_hash', 'sample_status')">-->
<!--              <el-table-column-->
<!--                  key="sample_hash"-->
<!--                  prop="sample_hash"-->
<!--                  label="样本哈希"-->
<!--              >-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                  key="sample_status"-->
<!--                  prop="sample_status"-->
<!--                  label="样本状态"-->
<!--              >-->
<!--              </el-table-column>-->
<!--            </el-table>-->
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
          <el-button @click="sendUrl2Browser(param.mail, scope.row.checked_md5)" type="text" size="small">点击下载样本包</el-button>
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
    sendUrl2Browser(mail, checked_md5){
      let link = document.createElement('a');
      let url = 'http://10.51.10.68:8000/vts/download/?'+'mail='+mail+'&'+'checked_md5='+checked_md5;
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