<template>
  <el-dialog
    :title="addFriend.title"
    :visible.sync="addFriend.dialogVisible"
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
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="submitValue(scope.row.account)">添 加</el-button>
        </template>
      </el-table-column>

    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addFriend.dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Vue from "vue";
import {queryUser,sendFriendApply} from '@/api/user'

export default {
  props: ['addFriend'],
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
   changeModal() {
      this.$data.showAddFriendModal = !this.$data.showAddFriendModal;
    },
    submitValue(account) {
      sendFriendApply({friendId:account})
      .then(res => {
        console.log(res.code === 200)
        if(res.code === 200){
          const option = {
            id: account,
            params: this.$route.query.username
          };
          this.changeModal();
          this.addfirend(option);
          this.$message.success("已发送请求");
          this.$data.form.name = ''
          this.addFriend.dialogVisible = false
        }else{
          this.$message.error(res.message)
        }
      })

    }
  }
};
</script>
