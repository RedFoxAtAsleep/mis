<template>
  <div>
    <div>vue-json-editor demo</div>
    <vue-json-editor v-model="json"
                     :show-btns="false"
                     :mode="'tree'"
                     lang="zh"
                     @json-change="onJsonChange"
                     @has-error="onError">
    </vue-json-editor>
    <button type="button" @click="resetJson">reset</button>
    <button type="button" @click="submit">submit</button>
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
import {Message} from 'element-ui'
import VueJsonEditor from 'vue-json-editor'
import {listDownload} from '../api/api'

export default {
  data() {
    return {
      json: {
        "filter": {
          "id__gte": 35,
          "status": "prepared"
        },
        "values": ["id", "commit_gmtime", "status"],
        "order_by": ["-id"],
        "offset": 1,
        "limit": 5
      },
      tableData:[],
      cols:[],
    }
  },
  components: {
    VueJsonEditor
  },
  methods: {
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
        "filter": {},
        "values": [],
        "order_by": [],
        "offset": 0,
        "limit": 10
      }
    },
    submit: function (target) {
      console.log(target);
      console.log(this.json);
      listDownload(this.json).then(res =>{
        this.tableData = res.data;
        this.cols = res.values;
        console.log('res', res, res.values);
      }).catch(err => {
        Message.error(err)
      })
    },
  }
}
</script>

<style scoped>

</style>