<template>
  <div class="bodAll">
    <div style="margin-top: 10px;font-size: 50px;">
      <div class="iconfont icon-tuihui" style="top:1%;font-size: 40px;right: 1%;position: fixed;color: #ED8868" @click="goBack()"></div>
    </div>
    <div class="divBox">
        <div class="friendHeader">
          <div style="width: 150px;height: 150px;float: left">
            <img :src="portraitSrc" style="width: 150px;height: 150px">
          </div>
          <div style="float: left;margin-left: 2%;margin-top: 4%">
            <h3>{{currentUser.username}}</h3>
            <span>{{currentUser.intro || '这个人很懒什么都没有留下'}}</span>
          </div>
        </div>
       <div class="contentBox">
          <div class="contentLeft">
            <div class="leftHeader">
              <el-input type="text" placeholder="说点什么吧~" v-model="textarea">
                <template slot="append">
                  <el-upload
                      class="upload-demo"
                      action="http://localhost:8099/common/uploadImg"
                      multiple
                      list-type="picture"
                      :show-file-list="false"
                      :file-list="fileList"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :limit="1">
                    <i class="el-icon-picture"></i>
                  </el-upload>
                </template>
              </el-input>
              <div style="width: 100%;height: 60px;margin-top: 2px;text-align: right;line-height: 60px">
                <div v-for="(item,index) in imgList" :key="index" style="float: left;margin-right: 10px">
                  <img :src="item" style="width: 60px;height: 60px">
                </div>
                <el-button type="primary" size="mini" style="margin-right: 10px" @click="submitClick()">提交</el-button>
              </div>
            </div>
            <div class="leftMain" v-for="(item,index) in dynamicList" :key="'parent'+index">
                <div style="height: 50px;height: 50px;border-radius: 50%;margin: 10px">
                  <img :src="item.accountUrl" style="width: 50px;height: 50px;border-radius: 50%;float: left">
                  <h4>{{item.creator}}</h4>
                  <span>{{item.createTime}}</span>
                  <el-button type="text"
                             v-if="item.utterer === currentUser.account "
                             style="float: right;color:red;"
                             @click="delCircle(item)">删除</el-button>
                </div>
              <div style="margin: 10px">{{item.text}}</div>
              <div>
                <div v-for="(srcitem,srcindex) in item.circleOssList" :key="'src'+ srcindex" style="display: inline;margin: 0 10px">
                  <img :src="srcitem.url" style="width:100px;height: 100px">
                </div>
              </div>
              <el-divider></el-divider>
              <div v-if="item.circleReviewList" v-for="(review,listindex) in item.circleReviewList" :key="'child'+listindex" style="border-radius: 50%;margin: 10px">
                <img :src="review.accountUrl" style="width: 50px;height: 50px;border-radius: 50%;float: left;margin-right: 10px">
                <div style="float: left;">
                  <span v-if="review.reply === null || review.reply === '' ">
                    {{review.creator}} :
                  </span>
                  <span v-else>
                    {{`${review.creator} 回复 ${review.reply || ''}  : `}}
                  </span>
                </div>
                <div style="text-align: right">
                  <span>{{review.createTime}}</span>
                </div>
                <div>{{review.reviewContent}}</div>
                <div>
                  <el-button type="text" @click="replyClick(review)">回复</el-button>
                </div>
              </div>
              <div style="text-align: right">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="item.huifu"></el-input>
                <el-button size="mini" type="primary" @click="publishClick(item)">发表</el-button>
              </div>
            </div>
          </div>
         <div class="contentRight">
           <img src="../../assets/img/dongtai.gif" style="width: 100%;height: 300px;margin-top: -100px">
         </div>`
        </div>
    </div>
    <comment-index v-if="parentData.showDialog" :parentData = "parentData" @closeDialog="closeDialog"></comment-index>
  </div>
</template>

<script>
import CommentIndex from "../../components/friendDialog/commentIndex";
import {getUser} from '@/api/user'
import {submitCircle,fetchCircleList,publishReview,updateCircle} from '@/api/circle'

export default {
  components: {CommentIndex},
  data() {
    return {
      portraitSrc:'',// 头像路径
      huifu:'',// 回复
      time:'',// 时间
      textarea:'',
      fileList:[],
      imgList:[],
      dynamicList:[
        {
          src:require('@/assets/img/001.jpg'),
          id:101,
          name:'第一个',
          time:'2020-1-1',
          text:'第一段话',
          list:[
            {name:'评论1',listtext:'第一个评论的话',time:'10.09',id:1111},
            {name:'评论2',listtext:'第一个评论的话',time:'10.09',id:1222}
            ]
        },
        {
          src:require('@/assets/img/002.jpg'),
          id:201,
          name:'第二个',
          time:'2020-1-1',
          text:'第二段话',
          list:[
            {name:'评论1',listtext:'第一个评论的话',time:'10.09',id:2111},
            {name:'评论2',listtext:'第一个评论的话',time:'10.09',id:2222}
          ]
        }
        ],
      parentData:{
        showDialog: false
      },
      currentUser:{},
    };
  },
  mounted() {
    this.portraitSrc = require('@/assets/img/touxiang.png')
    this.getCurrentUser()
    this.getCircleList()
  },
  methods: {
    // 关闭后刷新
    closeDialog(){
      this.getCircleList()
    },
    delCircle(item){
      updateCircle({id:item.id,delFlag:"0"}).then(res => {
        this.$message({
          type: res.code === 200 ? 'success' : 'error',
          message: res.data
        })
        this.getCircleList()
      })
    },
    goBack() {
      this.$router.push({name:'chatroom'})
    },
    /** 获取用户信息 */
    getCurrentUser(){
      getUser().then(res => {
        this.currentUser = res.data
        this.portraitSrc = res.data.accountUrl
      })
    },
    submitClick(){
      submitCircle({text:this.textarea,urlList:this.imgList}).then(res => {
        this.$message({
          type: res.code === 200 ? 'success' :'error',
          message:res.data
        })
        this.getCircleList()
        this.textarea = ''
        this.imgList = []
      })
    },
    getCircleList(){
      fetchCircleList().then(res => {
        console.log(res.data)
        this.dynamicList = res.data
      })
    },
    // 发表
    publishClick(item) {
      console.log(item)
      publishReview({circleId:item.id,reviewContent:item.huifu}).then(res => {
        this.$message({
          type: res.code === 200 ? 'success' :'error',
          message:res.data
        })
        this.getCircleList()
      })

    },
    //回复
    replyClick(row) {
      this.parentData.showDialog = true
      this.parentData.row = row
    },
    handleAvatarSuccess(res, file) {
      this.imgList.push(res.data.url)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 50;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小总和不能超过 50MB!');
      }
      return isJPG && isLt2M;
    },
  }
};
</script>

<style scoped lang="scss">
.bodAll{
  width: 100%;
  position: relative;
  height: 100%;
}
  .divBox{
    width: 80%;
    margin: 0 auto;
  }
  .friendHeader{
    width: 100%;
    height: 150px;
    margin-top: 8%;
  }
  .contentBox{
    width: 100%;
    height: 100px;
    margin-top: 2%;

  }
  .contentLeft{
    width: 75%;
    float: left;
  }
  .leftMain{
    margin-top: 3%;
    border: 1px solid #dddd;
    background-color: white;
  }
  .contentRight{
    width: 23%;
    height: 100px;
    float: right;
  }
</style>
