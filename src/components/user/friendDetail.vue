<template>
  <!--elementUI-->
  <el-dialog
    :title="friendData.title"
    :visible.sync="friendData.dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form  :model="form" label-width="80px">
      <el-form-item label="头   像:">
        <div class="block">
          <el-avatar :size="50" :src="form.loginUser.accountUrl" />
        </div>
      </el-form-item>
      <el-form-item label="账   号:">
        <el-input v-model="form.friendAccount" disabled></el-input>
      </el-form-item>
      <el-form-item label="群   组:">
        <el-select v-model="form.group.nickname" placeholder="请选择" v-if="!edit" @change="changeGroup">
          <el-option
            v-for="item in friendGroups"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
            >
          </el-option>
        </el-select>
        <el-input v-else disabled v-model="form.group.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用 户 名:">
        <el-input v-model="form.loginUser.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵    称:">
        <el-input v-model="form.nickname" :disabled="readOnly"></el-input>
      </el-form-item>
      <el-form-item label="邮   箱:">
        <el-input v-model="form.loginUser.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="手 机 号:">
        <el-input v-model="form.loginUser.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="性   别:" >
        <el-radio-group v-model="form.loginUser.sex" disabled>
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简   介:" >
        <el-input type="textarea" v-model="form.loginUser.intro" placeholder="这个人很懒，什么都没有留下..." disabled></el-input>
      </el-form-item>
      <el-form-item label="生   日:">
        <el-date-picker
          v-model="form.loginUser.birth"
          type="date"
          placeholder="选择日期"
          disabled>
        </el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="friendData.dialogVisible = false">取 消</el-button>
      <el-button type="primary" v-if="edit" @click="changeBtn">编 辑</el-button>
      <el-button type="primary" v-else @click="saveChange">保存</el-button>

      </span>
  </el-dialog>
</template>
<script>
import {getUser,editUser,getFriend,editFriend} from '@/api/user'
import {fetchGroup} from "../../api/friendGroup";

export default {
  data(){
    return{
      dialogVisible:false,
      form:{
        nickname: '',
        loginUser:{
          accountUrl:`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`,
        },
        group:{
          nickname:''
        }
      },
      friendGroups:[],
      readOnly:true,
      edit:true
    }
  },
  props:['friendData'],
  mounted() {
    this.getFriendInfo()
    this.getGroupList()
  },
  methods:{
    uploadImage(){
    },
    changeGroup(groupId){
      this.form.group.id = groupId
    },
    saveChange(){
      let data = {friendAccount:this.form.friendAccount,groupId:this.form.group.id,nickname:this.form.nickname,id:this.form.id}
      editFriend(data).then(res => {
        this.$message({
          type: res.code === 200 ? "success" : "error",
          message: res.data
        })
        this.friendData.dialogVisible = false
        this.$router.push('/chatroom')

      })
    },
    changeBtn(){
      this.readOnly = false
      this.edit = false
      this.friendData.title = '编辑好友备注'
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
    //查询好友信息
    getFriendInfo(){
      getFriend({account:this.friendData.account}).then(res => {
        this.form = res.data
      })
    },

    getGroupList(){
      fetchGroup().then(res => {
        this.friendGroups = res.data
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
