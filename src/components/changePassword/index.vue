<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="parentData.showDialog" :close-on-click-modal="false">
      <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
        <el-step title="邮箱验证"></el-step>
        <el-step title="修改密码"></el-step>
      </el-steps>
      <div style="margin-top: 20px;width: 60%;">
        <el-form v-if="active == 0" :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="邮箱" prop="name" size="small">
            <el-input v-model="form.email">
              <el-button slot="append" @click="sendClick()">发送</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="value" size="small">
            <el-input v-model="form.value" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
          </el-form-item>
        </el-form>
        <el-form v-if="active == 1" :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="新密码" prop="password" size="small">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="rePwd" size="small">
            <el-input v-model="form.rePwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="subClick()">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {sendEmail} from "../../api/common";
import { verify } from "@/api/user";
import { checkPassword } from "@/api/validate"

export default {
  name: "index",
  props: ['parentData'],
  data() {
    let checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password)  {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    let pass = (rule, value, callback) => {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!reg.test(value)){
        callback(new Error('密码必须同时包含大小写字母及数字'))
      }else{
        callback()
      }
    };

    return {
      active: 1,
      form: {
        email: '',
        value: '',
        password: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        value:[
          {required: true, message: '请输入六位验证码',trigger: 'blur'}
        ],
        password:[
          {required: true, message : '请输入密码',trigger: 'blur'},
          {validator: pass, message: '密码必须同时包含大小写字母及数字',trigger: ['blur','change']}
        ],
        rePwd:[
          {required: true, message : '请输入确认密码',trigger: 'blur'},
          { validator: checkPass, trigger: ['blur','change']}
        ]
      }
    }
  },
  computed:{

  },
  methods: {
    // 发送验证码
    sendClick() {
      sendEmail({email:this.form.email}).then(res => {
        console.log(res.code === 200)
        console.log(res.data)
        this.$message({
          type: res.code === 200 ? "success" : "error",
          message: res.code === 200 ? "验证邮件发送成功" : "验证邮件发送失败，请联系系统管理员"
        })
      })
    },
    // 提交
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          verify({
            registerAccount: this.form.email,
            verifyCode: this.form.value
          }).then(res =>{
            if(res.code === 200){
              this.active = 1
            }else{
              this.$message({
                type: 'error',
                message: res.data
              })
            }
          })
          /*this.active = this.active + 1*/
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 提交 修改密码
    subClick() {
      console.log(this.form.password)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log('校验通过')
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
