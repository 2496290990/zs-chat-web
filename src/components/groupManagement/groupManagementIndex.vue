<template>
  <div class="group">
    <el-dialog title="分组管理" :visible.sync="parentData.showDialog" @close="closeDialog" :close-on-click-modal="false"	>
      <div class="custom-tree-container" style="height: 250px;overflow-y: auto">
        <div style="margin-bottom: 10px">
          <el-button type="primary" size="mini" @click="editClick()">编辑</el-button>
          <el-button type="primary" size="mini"  @click="addClick()">添加</el-button>
        </div>
        <div class="block">
<!--          <el-tree-->
<!--              :data="data"-->
<!--              show-checkbox-->
<!--              node-key="id"-->
<!--              default-expand-all-->
<!--              :props="defaultProps"-->
<!--              @node-click="handleNodeClick"-->
<!--              :expand-on-click-node="false">-->
<!--            <span class="custom-tree-node" slot-scope="{ node, data }">-->
<!--              <span v-if="data.myFriendList">-->
<!--                 <span v-if="!data.showInput">{{ data.nickname }}</span>-->
<!--                 <span v-if="data.showInput"><el-input v-model="data.nickname" size="mini"></el-input></span>-->

<!--              </span>-->
<!--              <span v-else>-->
<!--                <span>{{ data.nickname }}</span>-->
<!--              </span>-->
<!--              <span v-if="data.myFriendList && data.nickname !== '我的好友'">-->
<!--                <el-button type="text" size="mini" @click="editClick(data)">编辑</el-button>-->
<!--&lt;!&ndash;                <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>&ndash;&gt;-->
<!--                <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>-->
<!--              </span>-->
<!--            </span>-->
<!--          </el-tree>-->
          <el-table :data="data" border style="width: 100%" fit>
            <el-table-column prop="nickname" label="分组名称">
              <template slot-scope="scope">
                <el-input v-if="showInput && (scope.row.nickname != '我的好友'&&scope.row.nickname != '黑名单')" v-model="scope.row.nickname"></el-input>
                <span v-else>{{scope.row.nickname}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="操作" align="center" width="100px">
              <template slot-scope="scope">
                <el-button :disabled="scope.row.nickname == '我的好友'||scope.row.nickname == '黑名单'" type="text" size="mini" @click="removeClick(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="text-align: center">
        <el-button type="primary" size="small" @click="saveClick()">保存</el-button>
        <el-button type="primary" size="small" @click="cancel()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchGroup, updateList } from "../../api/friendGroup";

export default{
	name: "groupManagementIndex",
	props: ["parentData"],
	data(){
		return {
			defaultProps: {
				children: "myFriendList",
				label: "nickname"
			},
			data: [],
			showInput: false,
		};
	},
	mounted(){
		this.data = this.parentData.data;
		this.queryMyGroup();
	},
	methods: {
		queryMyGroup(){
			fetchGroup().then(res => {
				this.data = res.data;
			});
		},
		handleNodeClick(data){
			console.log(data, "data");
		},
		// 编辑
		editClick(){
			this.showInput = true;
		},
		// 添加
		addClick(data){
			this.showInput = true;
			let obj = {
				id: "",
				nickname: "",
				showInput: false,
				// myFriendList: []
			};
			// const newChild = { label: "", obj: obj };
			// if (!data.myFriendList) {
			//   this.$set(data, 'myFriendList', []);
			// }
			this.data.push(obj);
		},
		// 删除
		removeClick(index, row){
			this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
        if(row.nickname != "黑名单" && row.nickname != "我的好友"){
          this.data.splice(index, 1);
        }
				this.$message({
					type: "success",
					message: "删除成功!"
				});
			})["catch"](() => {
				this.$message({
					type: "info",
					message: "已取消删除"
				});
			});
		},
		// 保存
		saveClick(){
			updateList(this.data).then(res=>{
				this.parentData.showDialog = false;
				this.$emit("closeDia");
			});
		},
		cancel(){
			this.parentData.showDialog = false;
		},
		// 删除
		remove(node, data){
			this.data.map((item, index)=>{
				if(item.groupName == data.groupName){
					this.data.splice(index, 1);
				}
			});
		},
		// 关闭弹窗
		closeDialog(){
			this.data.map(item=>{
				item.showInput = false;
			});
		}
	}
};
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
