<template>
  <div id="sample" style="width:600px;height:400px"></div>
</template>

<script>

import api from "@/api/api";

export default {
  name: "VtsStatisticRequire",
  props: [],
  data(){
    return {
      rows:[],
      chartType: 'pie',
      dimension: [],
      facts:[],
      name2label:{
        date: '日期',
        id__count: '样本数量',
        size__sum: '文件大小/MB',
      }
    }
  },
  computed:{
    cols: function(){
      let cols = this.rows2cols(this.rows);
      return cols
    },
    // facts: function(){
    //   let cols = this.rows2cols(this.rows);
    //   delete cols[this.dimension]
    //   let series = []
    //   Object.keys(cols).forEach(x=>{
    //     series.push({
    //       name: x,
    //       type: this.charType,
    //       data: cols[x]
    //     })
    //   })
    //   return series
    // }
  },
  methods: {
    rows2cols(objs){
      let kvs = {}
      if(!objs){
        return kvs
      }
      if(!Object.keys(objs[0])){
        return kvs
      }
      let ks = Object.keys(objs[0])
      ks.forEach(k=>{kvs[k]=[]})
      objs.forEach(obj=>{
        ks.forEach(k=>{kvs[k].push(obj[k])})
      })
      return kvs
    },

    drawChart(id) {
      let myChart = this.$echarts.init(document.getElementById(id));
      myChart.setOption({
        title: {
          text: '本地样本情况'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: this.dimension,
        },
        series: this.facts
      });
    },
  },
  created(){
    let queryBody = {
      "row_extension": [],
      "select":["mime_sub", "size__sum", "id__count"],
      "from":"vts_sample",
      "where": {},
      "group_by":["mime_sub"],
      "aggregate":["id__count", "size__sum"],
      "order_by": ["-size__sum", "-id__count"],
      "offset": 0,
      "limit": 100,
      "timezone_offset": new Date().getTimezoneOffset(),
      "datetime_format": "yyyy-MM-dd"
    };
    api.simpleQuery(queryBody).then(res=>{
      this.rows = res.data.data
      this.dimension = this.cols['mime_sub'];
      let ys = ["id__count", "size__sum"];
      this.facts = [];
      ys.forEach(y=>{
        let data = []
        this.cols[y].forEach(x=>{data.push(x.toFixed(2))})
        this.facts.push({
          name: this.name2label[y],
          type: this.chartType,
          data: data,
        })
      });

    }).then(()=>{
      this.drawChart('sample')
    })
  },
  mounted(){

  },

}
</script>

<style scoped>



</style>