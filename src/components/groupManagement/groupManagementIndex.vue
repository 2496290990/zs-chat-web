<template>
  <div class="group">
    <el-dialog title="分组管理" :visible.sync="parentData.showDialog" @close="closeDialog" :close-on-click-modal="false"	>
      <div class="custom-tree-container" style="height: 250px;overflow-y: auto">
        <el-button type="primary" size="mini"  @click="() => append(data)">添加</el-button>
        <div class="block">
          <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              default-expand-all
              :props="defaultProps"
              @node-click="handleNodeClick"
              :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span v-if="data.myFriendList">
                 <span v-if="!data.showInput">{{ data.nickname }}</span>
                 <span v-if="data.showInput"><el-input v-model="data.nickname" size="mini"></el-input></span>

              </span>
              <span v-else>
                <span>{{ data.nickname }}</span>
              </span>
              <span v-if="data.myFriendList && data.nickname !== '我的好友'">
                <el-button type="text" size="mini" @click="editClick(data)">编辑</el-button>
<!--                <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>-->
                <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div style="text-align: center">
        <el-button type="primary" size="small">保存</el-button>
        <el-button type="primary" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {fetchGroup} from "../../api/friendGroup";

export default {
  name: "groupManagementIndex",
  props:['parentData'],
  data() {
    return{
      defaultProps: {
        children: 'myFriendList',
        label: 'nickname'
      },
      data:[],
      showInput: false
    }
  },
  mounted() {
    this.data = this.parentData.data
    this.queryMyGroup()
  },
  methods:{
    queryMyGroup(){
      fetchGroup().then(res => {
        this.data = res.data
      })
    },
    handleNodeClick(data) {
      console.log(data,'data')
    },
    // 编辑
    editClick(data) {
      this.showInput = true
      this.data.map(item => {
        if (item.nickname == data.nickname) {
          item.showInput = true
        }
      })
    },
    // 添加
    append(data) {
      console.log(data,'data')
      let obj = {
        id:'',
        nickname:'',
        showInput:false,
        myFriendList:[]
      }
      const newChild = { label: '', obj: obj };
      // if (!data.myFriendList) {
      //   this.$set(data, 'myFriendList', []);
      // }
      this.data.push(obj);
    },
    // 删除
    remove(node, data) {
      this.data.map((item,index)=>{
        if (item.groupName == data.groupName){
          this.data.splice(index,1)
        }
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.data.map(item=>{
        item.showInput = false
      })
    }
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
 .group /deep/ .el-tree-node__content{
    height: 40px !important;
  }
  .group /deep/ .el-dialog{
    height: 400px;
    overflow-y: auto;
  }
</style>
