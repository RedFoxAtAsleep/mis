<template>
  <div>
    <div style="padding: 10px">
    </div>
    <vue-json-editor v-model="json"
                     :show-btns="false"
                     :mode="'tree'"
                     lang="zh"
                     @json-change="onJsonChange"
                     @has-error="onError">
    </vue-json-editor>
    <div class="left">
      <el-button
          v-for="cache in Object.keys(caches)"
          :key="cache"
          :label="cache"
          type="text" @click="json=caches[cache]">{{ cache }}</el-button>
    </div>
    <div style="padding: 10px"></div>
    <div class="left">
      <el-button type="button" @click="resetJson">reset</el-button>
      <el-button type="button" @click="submit">submit</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%"
        max-height="250">
      <el-table-column
          v-for="col in cols"
          :key="col"
          :prop="col"
          :label="col"
          width="150">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import {Message} from 'element-ui'
import VueJsonEditor from 'vue-json-editor'
import {simpleQuery} from '@/api/api'


export default {
  name: 'JsonQuery',
  data() {
    return {
      json: {},
      caches:{
        'require_daily':{
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
        },
        'requires': {
          "select": ["created", "collected", "checked_md5", "report"],
          "from":"require",
          "where": {"created__gte": "2020-09-29"},
          "group_by":[],
          "aggregate":[],
          "order_by": ["-created"],
          "offset": 0,
          "limit": 100,
          "timezone_offset": new Date().getTimezoneOffset(),
          "datetime_format": "yyyy-MM-dd"
        },
        'require_static_a_week': {
          "select": ["mail", "mail__count", "origin_size__sum"],
          "from":"require",
          "where": {"created__gte": "2020-09-29"},
          "group_by":["mail"],
          "aggregate":["mail__count", "origin_size__sum"],
          "order_by": ["mail__count"],
          "offset": 0,
          "limit": 5,
          "timezone_offset": new Date().getTimezoneOffset(),
          "datetime_format": "yyyy-MM-dd"
        },
        'commit_static_a_week': {
          "select": ["mail", "mail__count", "origin_size__sum"],
          "from":"commit",
          "where": {"commit_gmtime__gte": "2020-09-29"},
          "group_by":["mail"],
          "aggregate":["mail__count", "origin_size__sum"],
          "order_by": ["mail__count"],
          "offset": 0,
          "limit": 5,
          "timezone_offset": new Date().getTimezoneOffset(),
          "datetime_format": "yyyy-MM-dd"
        },
        'commit_static_every_day': {
          "row_extension": ["commit_gmtime__year", "commit_gmtime__month", "commit_gmtime__day"],
          "select":["commit_gmtime__year", "commit_gmtime__month", "commit_gmtime__day", "id__count", "origin_size__sum"],
          "from":"commit",
          "where": {},
          "group_by":["commit_gmtime__year", "commit_gmtime__month", "commit_gmtime__day"],
          "aggregate":["id__count", "origin_size__sum"],
          "order_by": ["-origin_size__sum"],
          "offset": 0,
          "limit": 5,
          "timezone_offset": new Date().getTimezoneOffset(),
          "datetime_format": "yyyy-MM-dd"
        },
        'commit_static_every_week': {
          "row_extension": ["commit_gmtime__year", "commit_gmtime__week", "commit_gmtime__day"],
          "select":["commit_gmtime__year", "commit_gmtime__month", "commit_gmtime__day", "id__count", "origin_size__sum"],
          "from":"commit",
          "where": {},
          "group_by":["commit_gmtime__year", "commit_gmtime__month", "commit_gmtime__day"],
          "aggregate":["id__count", "origin_size__sum"],
          "order_by": ["-origin_size__sum"],
          "offset": 0,
          "limit": 5,
          "timezone_offset": new Date().getTimezoneOffset(),
          "datetime_format": "yyyy-MM-dd"
        }


      },
      tableData:[],
      cols:[],
    }
  },
  created(){
    // this.$http.get('/posts', {params:{num:3}}).then(res=>{
    //   console.log('mockdata1',res);
    // });
    // this.$http.post('/news',{num:3}).then(res=>{
    //   console.log('mockdata2',res);
    // })
  },
  components: {
    VueJsonEditor
  },
  methods: {
    onDateChange(value){
      console.log(value)
      // let start, end
      // [start, end] = value
      // console.log(start, end)
    },
    onJsonChange(value) {
      console.log('jsonchange:', value);
      this.json = value;
    },
    onJsonSave(value) {
      console.log('jsonsave:', value);
    },
    onError(value) {
      console.log('error:', value);
    },
    resetJson() {
      this.json = {
        "select": [],
        "from":"",
        "where": {},
        "group_by":[],
        "aggregate":[],
        "order_by": [],
        "offset": 0,
        "limit": 5,
        "timezone_offset": new Date().getTimezoneOffset(),
        "datetime_format": "yyyy-MM-dd HH:mm:ss"
      }
    },
    submit: function (target) {
      console.log(target);
      console.log(this.json);
      simpleQuery(this.json).then(res =>{
        this.tableData = res.data.data;
        this.cols = this.json.select;
      }).catch()
    },
  }
}
</script>

<style scoped>
.left {
  text-align: left;
}

</style>
