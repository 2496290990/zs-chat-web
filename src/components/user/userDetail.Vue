<template>
  <!--elementUI-->
  <el-dialog
    :title="parentData.title"
    :visible.sync="parentData.dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form  :model="form" label-width="80px">
      <el-form-item label="头   像:">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8099/common/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :disabled="readOnly">
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="账   号:">
        <el-input v-model="form.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵   称:">
        <el-input v-model="form.username" :disabled="readOnly"></el-input>
      </el-form-item>
      <el-form-item label="邮   箱:">
        <el-input v-model="form.email" :disabled="readOnly"></el-input>
      </el-form-item>
      <el-form-item label="手 机 号:">
        <el-input v-model="form.phone" :disabled="readOnly"></el-input>
      </el-form-item>
      <el-form-item label="性   别:" >
        <el-radio-group v-model="form.sex" :disabled="readOnly">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简   介:" >
        <el-input type="textarea" v-model="form.intro" placeholder="这个人很懒，什么都没有留下..." :disabled="readOnly"></el-input>
      </el-form-item>
      <el-form-item label="生   日:">
        <el-date-picker
          v-model="form.birth"
          type="date"
          placeholder="选择日期"
          :disabled="readOnly">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="新密码:" v-show="!readOnly">
        <el-input v-model="form.newPwd" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" v-show="!readOnly">
        <el-input v-model="form.rePwd" ></el-input>
      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="parentData.dialogVisible = false">取 消</el-button>
      <el-button type="primary" v-if="edit" @click="changeBtn">编 辑</el-button>
      <el-button type="primary" v-else @click="saveUser">保存</el-button>

      </span>
  </el-dialog>
</template>
<script>
import {getUser,editUser} from '@/api/user'
export default {
  data(){
    return{
      dialogVisible:false,
      form:{
        account:'',
        email:'',
        phone:'',
        sex: 0,
        username : '',
        newPwd:'',
        rePwd:'',
        imageUrl: `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`,
        accountUrl:'',
        intro:'',
        birth:''
      },
      readOnly:true,
      edit:true
    }
  },
  props:{
    parentData:{
      type:Object,
      default:''
    }
  },
  mounted() {
    this.getUser()
  },
  methods:{
    uploadImage(){

    },
    saveUser(){
      editUser(this.form)
        .then(res => {
          this.$message.success(res)
          this.parentData.dialogVisible = false
        })
    },
    changeBtn(){
      this.readOnly = false
      this.edit = false
      this.parentData.title = '编辑个人信息'
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
      this.form.accountUrl = res.data.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.edit = true
          this.readOnly = true
          done();
        })
        .catch(_ => {});
    },
    getUser(){
      getUser().then(res => {
        this.form.account = res.data.account
        this.form.email = res.data.email
        this.form.imageUrl = res.data.accountUrl
        this.form.username = res.data.username
        this.form.phone = res.data.phone
        this.form.sex  = res.data.sex
        this.form.birth = res.data.birth
        this.form.intro = res.data.intro
      })
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>
