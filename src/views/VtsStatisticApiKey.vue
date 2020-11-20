<template>
  <div>
    <div>
      <el-form :inline="true" ref="param" :model="param" label-width="100px">
        <el-form-item label="时间范围">
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
        <el-button @click="initChart">查询</el-button>
      </el-form>
    </div>
    <highcharts  :options="chartOptions"></highcharts>
    <el-card class="box-card">
      <div v-for="y in ['id__count', 'count__sum']" :key="y" class="text item">
        <span>{{'总和' + name2label[y] + ': ' +  cols[y].reduce((m,n)=>m+n)}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import api from "@/api/api";
import moment from "moment";

export default {
  name: "VtsStatisticApiKey",
  props: [],
  data(){
    return {
      rows:[],
      x: 'date',
      ys: ["id__count", "count__sum"],
      param: {
        created_range: ['', ''],
      },
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
      },
      chartOptions:{
        chart: {
          type: 'column'
        },
        title: {
          text: 'Vt Api Key 每日调用情况'
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: [],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        series: [],
        lang:{
          contextButtonTitle: "图表导出菜单",
          downloadJPEG:"下载 JPEG 图片",
          downloadPDF:"下载 PDF 文件",
          downloadPNG:"下载 PNG 文件",
          downloadSVG:"下载 SVG 文件",
          printChart:"打印图表"
        },
        exporting:{},
        credits: {
          enabled:false
        },
      },
      name2label:{
        date: '日期',
        id__count: 'API Key使用批次',
        count__sum: 'API Key使用计数',
      },

    }
  },
  computed:{
    cols: function(){
      let cols = this.rows2cols(this.rows);
      return cols
    },
  },
  methods: {
    rows2cols(objs){
      console.table(objs);
      let kvs = {};
      if(objs.length === 0){
        return kvs
      }
      if(Object.keys(objs[0]).length === 0){
        return kvs
      }
      let ks = Object.keys(objs[0]);
      ks.forEach(k=>{kvs[k]=[]});
      objs.forEach(obj=>{
        ks.forEach(k=>{kvs[k].push(obj[k])})
      });
      return kvs
    },
    initChart() {
      let queryBody = {
        "row_extension": ["created__year", "created__month", "created__day"],
            "select":["created__year", "created__month", "created__day", "id__count", "count__sum"],
            "from":"apikey",
            "where": {
          "created__gte": this.param.created_range[0],
              "created__lt": this.param.created_range[1],
        },
        "group_by":["created__year", "created__month", "created__day"],
            "aggregate":["id__count", "count__sum"],
            "order_by": ["-created__year", "-created__month", "-created__day"],
            "offset": 0,
            "limit": 100,
            "timezone_offset": new Date().getTimezoneOffset(),
            "datetime_format": "yyyy-MM-dd"
      };
      api.simpleQuery(queryBody).then(res => {
        let data = Object.assign(res.data.data)
        for(let i=0; i<data.length; i++){
          let year = data[i]['created__year']
          let month = data[i]['created__month']
          let day = data[i]['created__day']
          data[i]['date'] = `${year}-${month}-${day}`
        }
        this.rows = data

        let ys = this.ys;
        let facts = [];
        ys.forEach(y=>{
          facts.push({
            name: this.name2label[y],
            data: this.cols[y],
          })
        });

        this.chartOptions.xAxis.categories = this.cols['date'];
        this.chartOptions.series = facts
      }).catch()
    },
  },
  created(){
    const end = moment().add(1, 'day').format("YYYY-MM-DD");
    const start = moment(end).add(-1, 'week').format("YYYY-MM-DD")
    this.param.created_range = [start, end]

  },
  mounted(){
    this.initChart()
  },

}
</script>

<style scoped>



</style>

