<template>
  <el-dialog
    :title="parentData.title"
    :visible.sync="parentData.dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-form :model="form" :inline="true">
      <el-form-item label="搜索:">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryUser" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="accountUrl"
        label="头像"
        width="180">
        <template slot-scope="scope">
          <div class="block"><el-avatar :size="50" :src="scope.row.accountUrl"></el-avatar></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="简介">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="简介">
        <template slot-scope="scope">
          <el-button type="primary" @click="submitValue(scope.row.account)">添 加</el-button>
        </template>
      </el-table-column>

    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="parentData.dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
<!--  <a-modal
    style="width: 80%"
    title="添加好友"
    v-model="showAddFriendModal"
    @ok="submitValue"
    @cancel="showAddFriendModal = false"
  >
    <el-form :model="form" :inline="true">
      <el-form-item label="搜索:">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="queryUser" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="accountUrl"
        label="头像"
        width="180">
        <template slot-scope="scope">
          <div class="block"><el-avatar :size="50" :src="scope.row.accountUrl"></el-avatar></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="简介">
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showAddFriendModal = false">取 消</el-button>
      <el-button type="primary" @click="submitValue">确 定</el-button>
    </div>
  </a-modal>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Vue from "vue";
import {queryUser} from '@/api/user'

export default {
  props: ['parentData'],
  data() {
    return {
      form: {
        name: "",
      },
      tableData:[],
      showAddFriendModal: false
    };
  },
  computed: {
    // ...mapGetters({
    //   contact: "addfirend"
    // }),
  },
  methods: {
    ...mapActions(["addfirend"]),
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.edit = true
          this.readOnly = true
          done();
        })
        .catch(_ => {});
    },
    queryUser() {
      queryUser({name: this.form.name}).then(res => {
        this.tableData = res.data;
      })
    },
   /* changeModal() {
      this.$data.showAddFriendModal = !this.$data.showAddFriendModal;
    },*/
    submitValue(account) {
      console.log(account)
      /*const option = {
        id: this.form.name,
        params: this.$route.query.username
      };
      this.changeModal();
      this.addfirend(option);
      this.$message.success("已发送请求");
      this.$data.form.name = ''*/
    }
  }
};
</script>
