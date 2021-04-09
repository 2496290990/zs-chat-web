<template>
  <div>
    <el-dialog title="请回复" :visible.sync="parentData.showDialog" width="50%">
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
      </el-input>
      <div style="text-align: right;margin-top: 20px">
        <el-button type="primary" size="small" @click="review">回复</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {publishReview} from '@/api/circle'
export default {
  name: "commentIndex",
  props:['parentData'],
  data() {
    return{
      textarea:''
    }
  },
  mounted() {
    console.log(this.parentData.row,'row')
  },
  methods:{
    review(){
      let row = this.parentData.row
      console.log(row,'row')
      publishReview({circleId:row.circleId,reviewContent:this.textarea,reply:row.reviewId}).then(res => {
        this.$message({
          type: res.code === 200 ? 'success' : 'error',
          message:res.data
        })
        this.parentData.showDialog = false
        this.$emit('closeDialog')
      })
    }
  }
}
</script>

<style scoped>

</style>
