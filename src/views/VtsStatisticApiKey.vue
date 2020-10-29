<template>
  <div id="apikey" style="width:600px;height:400px"></div>
</template>

<script>

import api from "@/api/api";

export default {
  name: "VtsStatisticApiKey",
  props: [],
  data(){
    return {
      rows:[],
      chartType: 'bar',
      dimension: [],
      facts:[],
      name2label:{
        date: '日期',
        id__count: 'API Key使用批次计数',
        count__sum: 'API Key使用计数',
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
          text: '每日VT API KEY使用情况'
        },
        tooltip: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: this.dimension
          // type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: this.facts
        // series: [{
        //   data: [120, 200, 150, 80, 70, 110, 130],
        //   type: 'bar'
        // }]
        // series: [{
        //   data: this.cols['origin_size__sum'],
        //   type: 'bar'
        // },{
        //   data: this.cols['checked_size__sum'],
        //   type: 'bar'
        // }]
      });
    },
  },
  created(){

  },
  mounted(){
    let queryBody = {
      "row_extension": ["created__year", "created__month", "created__day"],
      "select":["created__year", "created__month", "created__day", "id__count", "count__sum"],
      "from":"apikey",
      "where": {},
      "group_by":["created__year", "created__month", "created__day"],
      "aggregate":["id__count", "count__sum"],
      "order_by": ["-created__year", "-created__month", "-created__day"],
      "offset": 0,
      "limit": 100,
      "timezone_offset": new Date().getTimezoneOffset(),
      "datetime_format": "yyyy-MM-dd"
    };
    api.simpleQuery(queryBody).then(res=>{
      let data = res.data.data
      for(let i=0; i<data.length; i++){
        data[i]['date'] = String(data[i]['created__year'])+String(data[i]['created__month'])+String(data[i]['created__day'])
      }
      this.rows = data
      this.dimension = this.cols['date'];
      let ys = ["id__count", "count__sum"];
      let facts = [];
      ys.forEach(y=>{
        facts.push({
          name: this.name2label[y],
          type: this.chartType,
          data: this.cols[y],
        })
      });
      this.facts = facts;
      this.drawChart('apikey')

    })
  },

}
</script>

<style scoped>



</style>