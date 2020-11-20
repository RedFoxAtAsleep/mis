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
      <el-form-item label="目标返回">
        <div><el-radio v-model="data.target" label="report">检查哈希列表文件</el-radio></div>
        <div><el-radio v-model="data.target" label="package_vt">返回需要从VirusTotal下载的样本</el-radio></div>
        <div><el-radio v-model="data.target" label="package"  disabled >返回全部样本</el-radio></div>
      </el-form-item>
      <el-form-item label="请求备注">
        <el-input
            type="textarea"
            autosize
            placeholder="请输入备注，以便区分各次请求"
            v-model="data.note">
        </el-input>
      </el-form-item>
      <el-form-item class="left">
        <el-button  type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
<!--    <el-card style="width: 60vw" class="box-card" v-if="rows4samples && rows4samples.length > 0">-->
<!--      <div slot="header" class="clearfix">-->
<!--        <span v-if="'message' in res || 'msg' in res">{{res.data['message'] || res.data['msg']}}</span>-->
<!--      </div>-->
<!--      <el-table-->
<!--          :data="rows4samples"-->
<!--          style="width: 100%">-->
<!--        <el-table-column-->
<!--            v-for="col in Object.keys(col2label)"-->
<!--            :key="col"-->
<!--            :prop="col"-->
<!--            :label="col2label[col]"-->
<!--            width="300">-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </el-card>-->
    <el-card style="width: 100%" class="box-card" v-if="rows4res && rows4res.length > 0">
      <el-table
          :data="rows4res"
          style="width: 100%">
        <el-table-column
            key="res_k"
            prop="res_k"
            :label="col2label['res_k']"
            width="150">
        </el-table-column>
        <el-table-column
            key="res_v"
            prop="res_v"
            :label="col2label['res_v']"
            width="450">
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
        'target': 'report',
        'note': '',
      },
      res:{
        'data':{
          // 'sample':{},
          // 'message': '',
          // 'origin_md5': '',
          // 'checked_md5': '',
        }
      },
      files: [],
      col2label:{
        sample: '样本哈希值',
        description: '样本哈希检查结果',
        res_k: '返回项',
        res_v: '返回项值',
      },
      status2label:{
        'checked_illegal': '哈希非法',
        'checked_vt': '尝试从VirusTotal下载样本',
        'checked_local': '已从VirusTotal下载，还未入HDFS',
        'checked_repeat': '重复样本',
        'checked_exist': 'HDFS中已存在该样本',
        'unchecked': '服务中断'
      }
    }
  },
  computed:{
    // report: function (){
    //   if('report' in this.res.data){
    //     return this.res.data.report
    //   }
    //   else{
    //     return {}
    //   }
    // },
    // rows4samples: function (){
    //   if('samples' in this.report){
    //     let obj = Object.assign({}, this.report.samples)
    //     for(let sample in obj){
    //       obj[sample] = this.status2label[obj[sample]]
    //     }
    //     return api.obj2table(
    //         obj,
    //         'sample',
    //         'description')
    //   }
    //   else{
    //     return []
    //   }
    //
    // },
    rows4res: function (){
      let tmp = api.obj2table(
          this.res.data,
          'res_k',
          'res_v'
      )
      delete tmp['code']
      return tmp
    },
  },
  methods: {
    submit: function () {
      console.table(this.data);
      const FormData = require('form-data');
      const form = new FormData();
      form.append("mail", this.data.mail || 'zhaojinhui@intra.nsfocus.com');
      form.append("hash_list", this.data.hash_list.raw);
      form.append("target", this.data.target);
      form.append("note", this.data.note);
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
