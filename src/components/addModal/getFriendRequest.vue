<template>
  <div>
    <el-dialog title="请求添加好友" :visible="this.isShowFriendRequest">
      <p :class="$style.p">{{this.$store.state.friendModule.friendRequest.status}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refusedClick">拒绝</el-button>
        <el-button type="primary" @click="acceptSubmit">接受</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
import {operationApply} from '../../api/user'
export default {
  data() {
    return {
      showRequestFriendModal: this.$store.state.friendModule.friendRequest
        .isShow
    };
  },
  computed: {
    // ...mapGetters({

    // }),
    isShowFriendRequest() {
      return this.$store.state.friendModule.friendRequest.isShow;
    }
  },

  methods: {
    ...mapActions(["acceptSubscribe", "declineSubscribe"]),
    changeModal() {
      this.$store.state.friendModule.friendRequest.isShow = !this.$store.state
        .friendModule.friendRequest.isShow;
    },
    acceptSubmit() {
      const friendId = this.$store.state.friendModule.friendRequest.from
      operationApply({proposer:friendId,state:1}).then(res => {
        if(res.code === 200){
          this.acceptSubscribe(friendId);
          this.changeModal();
          this.$message({
            type:'success',
            message:res.message
          })
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }

      })

    },
    refusedClick() {
      const options = {
        id: this.$store.state.friendModule.friendRequest.from,
        params: this.$route.query.username
      };
      operationApply({proposer:options.id,state:0}).then(res => {
        if (res.code === 200) {
          this.declineSubscribe(options);
          this.changeModal();
          this.$message({
            type: 'success',
            message: res.message
          })
        } else {
          this.$message.error(res.message)
        }
      })
    }

  }
};
</script>
<style module>
.p {
  text-align: center;
}
</style>
