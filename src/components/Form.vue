<template>
    <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="邮箱">
            <el-input type="mail" v-model="data.mail"></el-input>
        </el-form-item>
        <el-form-item label="哈希列表文件">
            <el-input type="file" v-model="data.hash_list"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import api from '../api/api';
    // import FormData from 'form-data'
    export default {
        name: "Form",
        data() {
            return {
                data: {
                    'mail': '',
                    'hash_list': ''
                }
            }
        },
        methods:{
            submit: function () {
                const FormData = require('form-data');

                const form = new FormData();
                form.append("mail", this.data.mail);
                form.append("hash_list", this.data.hash_list);
                api.post(form, { headers: {
                        "Content-Type": "application/json",
                        "cache-control": "no-cache",
                    }});
            }
        }
    }
</script>

<style scoped>

</style>
