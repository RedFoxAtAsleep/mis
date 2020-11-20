<template>
  <div>
    <el-form ref="form" :model="data" label-width="100px" class="demo-form" >
      <el-form-item label="内网邮箱">
        <el-input type="mail" v-model="data.mail"></el-input>
      </el-form-item>
      <el-form-item label="哈希列表">
        <el-upload class="upload-demo left" :file-list="files" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false" :on-change="onChange">
          <el-button slot="trigger"  type="default">选择哈希别表文件</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </el-form-item>
      <el-form-item class="left">
        <el-button  type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-card style="width: 60vw" class="box-card" v-if="rows && rows.length > 0">
      <div slot="header" class="clearfix">
        <span v-if="'message' in res || 'msg' in res">{{res.data['message'] || res.data['msg']}}</span>
      </div>
      <el-table
          :data="rows"
          style="width: 100%">
        <el-table-column
            v-for="col in Object.keys(col2label)"
            :key="col"
            :prop="col"
            :label="col2label[col]"
            width="300">
        </el-table-column>
      </el-table>
    </el-card>


  </div>
</template>

<script>
import api from '@/api/api';

export default {
  name: "VtsSubmitRequire",
  data() {
    return {
      data: {
        'mail': '@intra.nsfocus.com',
        'hash_list': '',
      },
      res:{
        'data':{
          'sample':{}
        }
      },
      files: [],
      col2label:{
        sample: '样本哈希值',
        description: '样本哈希检查结果'
      },
      status2label:{
        'checked_illegal': '哈希非法',
        'checked_vt': '尝试从VirusTotal下载样本',
        'checked_repeat': '重复样本',
        'checked_exist': 'HDFS中已存在该样本',
        'unchecked': '服务中断'
      }
    }
  },
  computed:{
    report: function (){
      if('report' in this.res.data){
        return this.res.data.report
      }
      else{
        return {}
      }
    },
    rows: function (){
      if('samples' in this.report){
        let obj = Object.assign({}, this.report.samples)
        for(let sample in obj){
          obj[sample] = this.status2label[obj[sample]]
        }
        return api.obj2table(
            obj,
            'sample',
            'description')
      }
      else{
        return []
      }

    },
  },
  methods: {
    submit: function () {
      console.table(this.data);
      const FormData = require('form-data');
      const form = new FormData();
      form.append("mail", this.data.mail || 'zhaojinhui@intra.nsfocus.com');
      form.append("hash_list", this.data.hash_list.raw);
      api.submitHashListV2(form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        this.res = res;
      }).catch(err=>console.exception(err));
    },
    onChange: function (file, fileList){
      console.log(this.data.hash_list, fileList)
      this.data.hash_list = file;
      this.files = fileList.slice(-1);
    },
    handlePreview: function(){},
    handleRemove: function(){}
  }
}
</script>

<style scoped>
.left {
  text-align: left;
}

</style>
