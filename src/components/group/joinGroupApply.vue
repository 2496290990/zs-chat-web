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
      this.getGroupinfo();
    }
  }
};
</script>
<style>
</style>
