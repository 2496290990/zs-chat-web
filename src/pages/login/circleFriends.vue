<template>
  <div class="bodAll">
    <!-- 朋友圈 -->
    <div class="circleFriends">
      <h1 style="color:wheat;padding-top: 20px;text-align: center;">
        校友邦朋友圈
      </h1>
      <div class="user">
        <!-- <img class="imgTi" style="" src="../../assets/img/0.jpg" alt="" /> -->
        <div class="titles">
          <p class="titel">用户名：<span>蔡徐坤</span></p>
          <p class="titel">
            <span>用户名</span> 朋友圈间距华东师大数据还是时间段开始
          </p>
        </div>
      </div>
      <!-- content -->
      <div
        class="fbBtn"
        style="margin-top: 250px;

      display: flex;margin-bottom:20px;   justify-content: flex-end;"
      >
        <el-button type="primary">发表</el-button>
      </div>
      <div class="fbu">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="textarea"
          style="width: 98%;"
          resize="none"
        >
        </el-input>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :show-file-list="false"
        >
          <i class="el-icon-camera-solid"></i>
        </el-upload>
      </div>
      <div class="picS" v-if="this.showPic">
        <p>
          <span> <i class="el-icon-picture"></i> 图片 (1/9)</span>
          <span
            style="font-size: 18px;  color: #666; cursor: pointer;"
            @click="closeClick"
            >x</span
          >
        </p>
        <div class="picShow">
          <img
            :src="pic"
            alt=""
            style="width:300px;height:300px"
            v-for="(pic, index) in fileList"
            :key="index"
          />
        </div>
      </div>
      <div class="content">
        <div class="orderList" v-for="(i, index) in 2" :key="index">
          <div class="top">
            <img
              style="width:30px;height:30px"
              src="../../assets/logo.png"
              alt=""
            />

            <span style="margin-left: 30px;">
              蔡徐坤嘎嘎嘎嘎嘎嘎嘎过过过过过过过过过过过过过过过
            </span>
            <span style="margin-left: 30px;"> 2021:2：2</span>
          </div>

          <div class="bottom">
            <!-- <img src="../../assets/img/1.jpg" alt="" /> -->

            她的头像风格太独特了{uin:2052943449,nick:@传送门,who:19}
          </div>
          <div class="picSTow"  >
            <div class="picShowTow">
              <img
                :src="pic"
                alt=""
                style="width:250px;height:250px"
                v-for="(pic, index) in fileList"
                :key="index"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      showPic: true,
      fileList: [
        "https://img2.baidu.com/it/u=2384869602,2949820686&fm=26&fmt=auto&gp=0.jpg",
        "https://img0.baidu.com/it/u=2395702865,2826888350&fm=26&fmt=auto&gp=0.jpg",
        "https://img2.baidu.com/it/u=2384869602,2949820686&fm=26&fmt=auto&gp=0.jpg",
        "https://img0.baidu.com/it/u=2395702865,2826888350&fm=26&fmt=auto&gp=0.jpg",
        "https://img2.baidu.com/it/u=2384869602,2949820686&fm=26&fmt=auto&gp=0.jpg",
        "https://img0.baidu.com/it/u=2395702865,2826888350&fm=26&fmt=auto&gp=0.jpg",
        "https://img0.baidu.com/it/u=2395702865,2826888350&fm=26&fmt=auto&gp=0.jpg",
        "https://img0.baidu.com/it/u=2395702865,2826888350&fm=26&fmt=auto&gp=0.jpg",
        "https://img0.baidu.com/it/u=2395702865,2826888350&fm=26&fmt=auto&gp=0.jpg"
      ],
      picList: []
    };
  },
  methods: {
    closeClick() {
      this.showPic = false;
    },
    // 弹出菜单 上传成功/失败调用
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3)
    },

    // 上传成功,赋值附件
    handSuccess(response, file, fileList) {
      console.log("ewe", response.data.url);
      // this.form1.url = response.data.url;
      this.fileList.push(response.data.url);
      this.showPic = true;
      //
    },
    //  上传文件名
    beforeUpload(file) {
      var arr = [".jpg", ".png"]; //允许上传的文件类型
      var flaig = arr.some(val => {
        return file.name.endsWith(val);
      });
      if (!flaig) {
        this.$message({
          message: "请上传正确的文件格式！！",
          type: "error"
        });

        return false;
      } else if (file.size > 1024 * 1024) {
        this.$message({
          message: "请上传1M以内的照片",
          type: "error"
        });
        return false;
      }
    },
    handlePreview(file) {
      console.log(file);
    },

    closeDia() {
      this.nameList = [];
      this.urlList = [];
      this.fileList = [];
    },
    afterRead(file) {
      console.log("file", file);
      // this.fileList.push(this.fileList.content)
    }
  }
};
</script>

<style scoped lang="scss">
/depp/ .el-upload {
  width: 100px !important;
  height: 75px !important;
}
/deep/ .el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100px !important;
  height: 75px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #ccc;
}

body {
  background-color: #e6eaeb;
}
.bodAll {
  width: 100%;
  background-image: url("../../assets/img/bj.jpg");
  // background-image: url(//i.gtimg.cn/qzone/space_item/orig/3/72019_top.jpg);
}
.circleFriends {
  // background: pink;
  width: 1200px;
  height: 500px;
  margin: 0 auto;

  .user {
    margin-top: 50px;
    display: flex;
    // justify-content: left;
    // flex-direction: column;
    width: 1200px;
    .imgTi {
      width: 300px;
      height: 100%;
    }
    .titles {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: left;
      margin-left: 20px;
      // width: 300px;
      // background: red;
      .titel2 {
        margin-top: 30px;
      }
    }
  }
  .fbu {
    display: flex;
  }
  .picS {
    background: white;
    p {
      display: flex;
      justify-content: space-between;
      padding: 25px 60px;
    }
    .picShow {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      img {
        margin-right: 40px;
        margin-top: 40px;
      }
    }
  }
  .picSTow{
    background: white;
     
    .picShowTow{
      padding-bottom: 30px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      img {
        margin-right: 50px;
        margin-top: 50px;
      }
    }
  }
  .content {
    margin-top: 100px;
    background: white;

    .dongt {
      width: 1000px;
      margin: 0 auto;
      background: white;
    }
    .orderList {
      margin: 50px auto;
      width: 1200px; 
      background: rgb(255, 255, 255);
      margin-bottom: 20px;
      box-shadow: 0 0 10px #ccc;
      .top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 30px;
        height: 40px;
        background: #eeeeee;
      }
      .bottom {
        text-align: left;
        text-indent: 30px;
        width: 750px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 45px;
      }
      //  display: flex;
      //  justify-content: space-between;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>
