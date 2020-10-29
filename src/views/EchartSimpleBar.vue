<template>
  <div id="main" style="width:600px;height:400px"></div>
</template>

<script>

import api from "@/api/api";

export default {
  name: "EchartSimpleBar",
  props: [],
  data(){
    return {
      rows:[],
      chartType: 'bar',
      dimension: [],
      facts:[],
      name2label:{
        date: '日期',
        id__count: '批量下载请求计数',
        origin_size__sum: '请求下载的样本数',
        checked_size__sum: '待获取的样本数',
        collected_size__sum: '成功获取的样本数',
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
      console.log('objs', objs)
      if(objs.length === 0){
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
          text: '每日样本下载情况'
        },
        tooltip: {},
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
    getRequireRows: async function (){
      let queryBody = {
        "row_extension": ["created__year", "created__month", "created__week", "created__day"],
        "select":["created__year", "created__month", "created__day", "id__count", "origin_size__sum", "checked_size__sum", "collected_size__sum"],
        "from":"require",
        "where": {},
        "group_by":["created__year", "created__month", "created__day"],
        "aggregate":["id__count", "origin_size__sum", "checked_size__sum", "collected_size__sum"],
        "order_by": ["-created__year", "-created__month", "-created__day"],
        "offset": 0,
        "limit": 10,
        "timezone_offset": new Date().getTimezoneOffset(),
        "datetime_format": "yyyy-MM-dd"
      };
      let res = await api.simpleQuery(queryBody)
      this.rows = res.data.data
    }
  },
  created(){
    let queryBody = {
      "row_extension": ["created__year", "created__month", "created__week", "created__day"],
      "select":["created__year", "created__month", "created__day", "id__count", "origin_size__sum", "checked_size__sum", "collected_size__sum"],
      "from":"require",
      "where": {},
      "group_by":["created__year", "created__month", "created__day"],
      "aggregate":["id__count", "origin_size__sum", "checked_size__sum", "collected_size__sum"],
      "order_by": ["-created__year", "-created__month", "-created__day"],
      "offset": 0,
      "limit": 10,
      "timezone_offset": new Date().getTimezoneOffset(),
      "datetime_format": "yyyy-MM-dd"
    };
    api.simpleQuery(queryBody).then(res=>{
      this.rows = res.data.data
      for(let i; i<this.rows.length; i++){
        this.rows[i]['date'] = String(this.rows[i]['created__year'])+String(this.rows[i]['created__month'])+String(this.rows[i]['created__day'])
      }

      this.dimension = this.cols['date'];
      let facts = ["id__count", "origin_size__sum", "checked_size__sum", "collected_size__sum"];
      this.facts = [];
      facts.forEach(fact=>{
        this.facts.push({
          name: this.name2label[fact],
          type: this.chartType,
          data: this.cols[fact],
        })
      });

    }).then(()=>{
      this.drawChart('main')
    })
  },
  mounted(){

  },

}
</script>

<style scoped>



</style>