<template>
  <el-dialog
    :title="createGroup.title"
    :visible.sync="createGroup.dialogVisible"
    width="45%"
    :before-close="handleClose">
    <el-form :model="form" >
      <el-form-item label="群头像:">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8099/common/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="群名称:">
        <el-input v-model="form.groupName" ></el-input>
      </el-form-item>
      <el-form-item label="简  介:">
        <el-input type="textarea" v-model="form.groupIntro"
          placeholder="群主很懒，什么都没有留下"></el-input>
      </el-form-item>
      <el-form-item label="标  签:">
        <el-input v-model="form.tag" ></el-input>
      </el-form-item>
      <el-form-item label="类  型:">
        <el-radio-group v-model="form.groupType">
          <el-radio :label="0">私有</el-radio>
          <el-radio :label="1">公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="加群方式:">
        <el-radio-group v-model="form.applyState">
          <el-radio :label="0">审批</el-radio>
          <el-radio :label="1">公开</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createGroup.dialogVisible = false">取 消</el-button>
      <el-button type="primary"  @click="saveGroup">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Vue from "vue";
import {createGroup} from '../../api/chatGroup'

export default {
  props:['createGroup'],
  data(){
    return {
      hxRes:false,
      hxGroupId: '123',
      form:{
        imageUrl: `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`,
        groupUrl:'',
        groupType:0,
        applyState:1,
        groupIntro:'',
        hxGroupId: '123',
      }
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
      this.form.groupUrl = res.data.url
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
    saveGroup(){
      //环信创建群组
      console.log(this.form.hxGroupId)
      let groupId = this.onCreateGroup('',{
          groupname: this.form.groupName,
          desc: this.form.groupIntro,
          //members: this.$data.form.membersList,
          approval: this.form.groupType != 1,
          pub: this.form.applyState == 1
        })
      console.log('gId' + groupId)
      if(!this.hxRes){
        createGroup(this.form).then(res => {
          console.log(res.data)
        })
      }else{
        this.$message.error('创建群组失败，请联系管理员')
      }
    },
    onCreateGroup: function (context, payload) {
      console.log(payload)
      let groupId = ''
      let _this = this
      let options = {
        data: {
          groupname: payload.groupname,                    // 群组名
          desc: payload.desc,                          // 群组描述
          members: payload.members,            // 用户名组成的数组
          public: payload.pub,                         // pub等于true时，创建为公开群
          approval: payload.approval,                  // approval为true，加群需审批，为false时加群无需审批
        },
        success(resp){
          groupId = resp.data.groupid
          console.log(_this.hxGroupId)
          //Vue.$store.dispatch('onGetGroupUserList')
        },
        error: function () { }
      };
      WebIM.conn.createGroupNew(options);
      return groupId;
    },
    changeHxGroupId(groupId) {
      console.log(this.form.hxGroupId + ":1")
      console.log(this.hxGroupId + ":1")
      this.form.hxGroupId = groupId
      this.hxGroupId = groupId
      console.log(this.form.hxGroupId + ":2")
      console.log(this.hxGroupId + ":2")
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
