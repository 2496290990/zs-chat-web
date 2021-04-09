<template>
  <el-dialog
    :title="joinGroup.title"
    :visible.sync="joinGroup.dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form :model="form" :inline="true">
      <el-form-item label="搜索:">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryGroup" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="groupUrl"
        label="群头像"
        width="180">
        <template slot-scope="scope">
          <div class="block"><el-avatar :size="50" :src="scope.row.accountUrl"></el-avatar></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="hxGroupId"
        label="群  号:"
        width="180">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="群名称:"
        width="180">
      </el-table-column>
      <el-table-column
        prop="groupIntro"
        label="简  介:">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="操  作:">
        <template slot-scope="scope">
          <el-button type="primary" @click="postJoinGroup(scope.row.hxGroupId)">添 加</el-button>
        </template>
      </el-table-column>

    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="joinGroup.dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
<!--  <a-modal title="申请入群啊" v-model="showGroupModel" :footer="null">
    <div>
      <a-input-search
        placeholder="请输入群组ID"
        v-model="select_groupid"
        @search="getGroupinfo"
        enterButton="搜索"
      />
    </div>
    <div class="pubGroup" v-if="showGroupListModel == true">
      <ul
        class="groupList"
        v-for="item in publicGroupList"
        :key="item.groupid"
        :title="item.groupid"
        @click="select(item)"
      >{{item.groupname}}</ul>
    </div>
    <div v-if="showGroupInfoModel == true" class="info">
      <div>
        <span class="infoTitle">群组名称</span>
        <span class="infoContent">{{publicGroupInfo.name}}</span>
      </div>
      <div>
        <span class="infoTitle">管理员</span>
        <span class="infoContent">{{publicGroupInfo.admin}}</span>
      </div>
      <div>
        <span class="infoTitle">简介</span>
        <span class="infoContent">{{publicGroupInfo.desc || '空'}}</span>
      </div>
      <div>
        <span class="infoTitle">审批</span>
        <span class="infoContent">{{publicGroupInfo.membersonly ? '[Y]' : '[N]'}}</span>
      </div>
      <div>
        <div class="groBack" @click="changeGroupListModel">
          <i class="el-icon-back"></i>
          <i>返回</i>
        </div>
        <div class="groCreate">
          <a-button @click="postJoinGroup" type="primary">申请加群</a-button>
        </div>
      </div>
    </div>
  </a-modal>-->
</template>
<script>
import "./group.less";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
import {queryGroup } from '@/api/chatGroup'
export default {
  props: ['joinGroup'],
  data() {
    return {
      select_groupid: "",
      showGroupModel: false,
      showGroupInfoModel: false,
      showGroupListModel: true,
      form:{},
      tableData:[]
    };
  },
  computed: {
    publicGroupList() {
      return this.$store.state.group.publicGroupList;
    },
    publicGroupInfo() {
      return this.$store.state.group.groupInfo;
    }
  },
  methods: {
    ...mapActions([
      "onGetGroupUserList",
      "onGetPublicGroup",
      "onGetGroupinfo",
      "onJoinGroup"
    ]),
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.edit = true
          this.readOnly = true
          done();
        })
        .catch(_ => {});
    },
    queryGroup(){
      queryGroup({queryLike:this.form.name}).then(res => {
        this.tableData = res.data
      })
    },
    changeGroupModel() {
      this.$data.showGroupModel = !this.$data.showGroupModel;
      if (!this.$data.showGroupListModel) {
        this.changeGroupListModel();
      }
      this.$data.select_groupid = "";
      this.getPublicGroup();
    },
    changeGroupListModel() {
      this.$data.showGroupListModel = !this.$data.showGroupListModel;
      this.$data.showGroupInfoModel = !this.$data.showGroupInfoModel;
    },

    getPublicGroup() {
      this.onGetPublicGroup();
    },
    getGroupinfo() {
      this.onGetGroupinfo({
        select_groupid: this.$data.select_groupid,
        callback: () => {
          this.$data.showGroupListModel = false;
          this.$data.showGroupInfoModel = true;
        }
      });

      // this.chanegGroupInfoModel()
    },
    postJoinGroup(groupId) {
      this.onJoinGroup({
        select_groupid: groupId
      });
      this.joinGroup.dialogVisible = false
    },
    select(key) {
      this.$data.select_groupid = key.groupid;
      // console.log(this.$data.elect_groupid);
      this.getGroupinfo();
    }
  }
};
</script>
<style>
</style>
