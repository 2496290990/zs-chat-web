<template>
    <div>
      <el-dialog title="修改密码" :visible.sync="parentData.showDialog" :close-on-click-modal="false"	>
        <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
          <el-step title="邮箱验证" ></el-step>
          <el-step title="修改密码" ></el-step>
        </el-steps>
        <div style="margin-top: 20px;width: 60%;">
          <el-form v-if="active == 0" :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="邮箱" prop="name" size="small">
              <el-input v-model="form.name">
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
            <el-form-item label="确认密码" prop="password" size="small">
              <el-input v-model="form.password" show-password ></el-input>
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
    export default {
        name: "index",
      props:['parentData'],
      data(){
          return{
            active:0,
            form:{
              name:'',
              value:'',
              password:''
            },
            rules:{
              name:[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]
            }
          }
      },
      methods:{
          // 发送验证码
        sendClick() {
          console.log(this.form,'name')
        },
        // 提交
        submitForm() {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.active = this.active + 1
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        // 提交 修改密码
        subClick(){

        }
      }
    }
</script>

<style scoped>

</style>
