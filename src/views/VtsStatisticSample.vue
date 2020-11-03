<template>
  <div>
    <div style="width: 40vw;height: 60vh">
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
      <highcharts  :options="chartOptions"></highcharts>

    </div>
  </div>
</template>

<script>

import api from "@/api/api";
import moment from "moment";

export default {
  name: "VtsStatisticRequire",
  props: [],
  data(){
    return {
      rows:[],
      name: 'mime_sub',
      y: 'id__count',
      param: {
        created_range: ['', ''],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end =  moment().add(1, 'day');
              const start = moment().add(-1, 'week');

              picker.$emit('pick', [start.toDate(), end.toDate()]);

              // const end = new Date();
              // const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              // picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {

              const end =  moment().add(1, 'day');
              const start = moment().add(-1, 'month');

              picker.$emit('pick', [start.toDate(), end.toDate()]);


              // const end = new Date();
              // const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              // picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {

              const end =  moment().add(1, 'day');
              const start = moment().add(-3, 'month');

              picker.$emit('pick', [start.toDate(), end.toDate()]);

              // const end = new Date();
              // const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              // picker.$emit('pick', [start, end]);
            }
          }],
      },
      chartOptions:{
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: '本地样本分类'
        },
        subtitle: {
          text: ''
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">"百分比": </td>' +
              '<td style="padding:0"><b>{point.percentage:.1f}%</b></td></tr>' +
           '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
          footerFormat: '</table>',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            },
            showInLegend: true
          },
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
        id__count: '样本数量',
        size__sum: '文件大小/MB',
      },
    }
  },
  computed:{
    cols: function(){
      let cols = this.rows2cols(this.rows);
      console.log(cols)
      return cols
    },
    facts: function (){
      let ys = ["id__count", "size__sum"];
      let facts = {};
      ys.forEach(y=>{

        let objs = [];
        this.rows.forEach((row)=>{
          objs.push({
            name: row[this.name],
            y:row[y]
          })
        })

        facts[y] = {
          name: this.name2label[y],
          colorByPoint: true,
          data: objs,
        }

      });
      return facts
    }
  },
  methods: {
    rows2cols(objs){
      let kvs = {}
      if(objs.length === 0){
        return kvs
      }
      if(Object.keys(objs[0]).length === 0){
        return kvs
      }
      let ks = Object.keys(objs[0])
      ks.forEach(k=>{kvs[k]=[]})
      objs.forEach(obj=>{
        ks.forEach(k=>{kvs[k].push(obj[k])})
      })
      return kvs
    },
    initChart() {
      let queryBody = {
        "row_extension": [],
        "select":["mime_sub", "size__sum", "id__count"],
        "from":"vts_sample",
        "where": {
          "created__gte": this.param.created_range[0],
          "created__lt": this.param.created_range[1],
        },
        "group_by":["mime_sub"],
        "aggregate":["id__count", "size__sum"],
        "order_by": ["-size__sum", "-id__count"],
        "offset": 0,
        "limit": 100,
        "timezone_offset": new Date().getTimezoneOffset(),
        "datetime_format": "yyyy-MM-dd"
      };
      api.simpleQuery(queryBody).then(res => {
        this.rows = Object.assign(res.data.data);
        this.chartOptions.series = this.facts[this.y]
        this.chartOptions.subtitle.text = this.name2label[this.y]
      }).catch()
    },
  },
  created(){
    const end = moment().add(1, 'day').format("YYYY-MM-DD");
    const start = moment(end).add(-1, 'week').format("YYYY-MM-DD");
    this.param.created_range = [start, end];
    this.chartOptions.exporting = {
      buttons: {
        toSizeButton: {
          text: 'size',
          onclick: () => {
            this.y = 'size__sum'
            this.chartOptions.series = this.facts[this.y];
            this.chartOptions.subtitle.text = this.name2label[this.y]
            // alert('You pressed the button!');
          }
        },
        toCountButton: {
          text: 'count',
          onclick: () => {
            this.y = 'id__count';
            this.chartOptions.series = this.facts[this.y];
            this.chartOptions.subtitle.text = this.name2label[this.y]
            // alert('You pressed the button!');
          }
        },
      }
    };
  },
  mounted(){
    this.initChart()
  },

}
</script>

<style scoped>



</style>