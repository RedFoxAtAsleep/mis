<template>
<!--  <el-form ref="form" :model="data" label-width="80px" :inline="true" class="demo-form-inline">-->
  <el-form ref="form" :model="data" label-width="100px" class="demo-form" >
    <el-form-item label="邮箱">
      <el-input type="mail" v-model="data.mail"></el-input>
    </el-form-item>
    <el-form-item label="哈希列表">
      <el-upload class="upload-demo left" :limit="1" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false" :on-change="onChange">
        <el-button slot="trigger"  type="default">选择哈希别表文件</el-button>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
    </el-form-item>
    <el-form-item class="left">
      <el-button  type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import apiClient from '../api/api';

export default {
  name: "Form",
  data() {
    return {
      data: {
        'mail': '',
        'hash_list': ''
      },
      hash_list: ''
    }
  },
  methods: {
    submit: function () {
      console.log(this.data)
      console.log(this.$refs.hash_list)
      const FormData = require('form-data');
      const form = new FormData();
      form.append("mail", this.data.mail || 'zhaojinhui@intra.nsfocus.com');
      form.append("hash_list", this.hash_list.raw);
      apiClient.submitHashList(form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    onChange: function (file, fileList){
      this.hash_list = file
      console.log(this.hash_list, fileList)
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
