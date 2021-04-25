<template>
  <div>
    <el-popover
      placement="bottom"
      width="60"
      trigger="click"
      v-model="showGroupSetting"
      @hide="changeSetModel"
    >
      <div class="setting" v-show="setInfo">
        <ul class="setting">
          <li @click="openInvite">
            <i class="el-icon-user">邀请群成员</i>
          </li>
          <li v-if="showAdminIcon">
            <i class="el-icon-edit-outline" @click="updatedGroupInfo">修改群信息</i>
            <i class="el-icon-warning" @click="changeBlackModel">群组黑名单</i>

            <i class="el-icon-switch-button" @click="dissolution">解散群组</i>
          </li>

          <li v-if="showCloseIcon" @click="quitGroup">
            <i class="el-icon-delete-solid">退出群组</i>
          </li>
        </ul>
      </div>

      <van-icon
        name="setting-o"
        size="16"
        slot="reference"
        @click="changeSetInfo"
        class="set-icon"
      />
    </el-popover>
    <GroupBlack ref="groupBlackModel" />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import "./group.less";
import GroupBlack from "./groupBlack.vue";
import {delGroup} from "../../api/chatGroup";

export default {
  data() {
    return {
      showGroupSetting: false,
      setInfo: false,
      showAdminIcon: false,
      showCloseIcon: false
    };
  },
  computed: {
    loginName() {
      const username =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).userId;
      return username;
    },
    groupAdmin() {
      return this.$store.state.group.groupInfo.admin;
    }
  },
  methods: {
    ...mapActions([
      "onInviteGroup",
      "onUpdataGroupInfo",
      "onGetGroupBlack",
      "onDissolveGroup",
      "onQuitGroup"
    ]),
    changeSettingModel() {
      this.$data.showGroupSetting = !this.$data.showGroupSetting;
    },
    changeSetInfo() {
      this.$data.setInfo = !this.$data.setInfo;
      if (this.loginName == this.groupAdmin) {
        this.$data.showAdminIcon = !this.$data.showAdminIcon;
      } else {
        this.$data.showCloseIcon = !this.$data.showCloseIcon;
      }
    },
    changeBlackModel() {
      this.onGetGroupBlack({
        select_id: this.$store.state.group.groupInfo.gid
      });
      this.$refs.groupBlackModel.chengeBlackModel();
    },
    openInvite() {
      this.$prompt("邀请群成员", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "用户名"
      })
        .then(({ value }) => {
          this.onInviteGroup({
            select_id: this.$store.state.group.groupInfo.gid,
            select_name: value
          })
        })
        ["catch"](() => {});
    },
    updatedGroupInfo() {
      this.$prompt("群组名", "修改群信息", {
        confirmButtonText: "修改",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.onUpdataGroupInfo({
            select_id: this.$store.state.group.groupInfo.gid,
            updateName: value,
            updateDesc: this.$store.state.group.groupInfo.desc
          }),
            this.$message({
              type: "success",
              message: "修改成功"
            });
        })
        ["catch"](() => {});
    },
    quitGroup() {
      this.onQuitGroup({
        select_id: this.$store.state.group.groupInfo.gid,
        callback: () => {
          this.closeModa();
        }
      });
    },
    dissolution() {
      let groupId = this.$store.state.group.groupInfo.gid
      this.$confirm("你确定要解散吗，请三思,后果自负", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          delGroup({hxGroupId:groupId}).then(res => {
            this.$message({
              type: res.code === 200 ? 'success' : 'error',
              message: res.data
            })
            this.onDissolveGroup({
              select_id: groupId,
              callback: () => {

              }
            })
            this.$router.push('/contact')
          })
      }).catch(() => {
          this.$message('取消操作')
      })
    },
    closeModa() {
      // 退出群组 or 解散群组 关闭弹窗
      this.$data.showGroupSetting = false;
      this.changeSetInfo();
      this.$emit("closeGroupSet");
      Vue.$router.push("/group");
    },
    changeSetModel() {
      this.$data.setInfo = false;
      if (this.loginName == this.groupAdmin) {
        this.$data.showAdminIcon = false;
      } else {
        this.$data.showCloseIcon = false;
      }
    }
  },
  components: {
    GroupBlack
  }
};
</script>
<style scoped>
.set .dialog {
  position: absolute;
  right: 40px;
  width: 300px;
}
.setting {
  list-style-type: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
}
.set-icon {
  position: absolute;
  top: 100px;
  right: 20px;
  cursor: pointer;
}
</style>
