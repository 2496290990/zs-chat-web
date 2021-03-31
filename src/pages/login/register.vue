<template>
  <div class="register-container">
    <section class="container">
      <h1
        style="text-align:center;font-size:28px;font-weight:900;letter-spacing: 10px;"
      >
        注册
      </h1>
      <section class="form-container">
        <el-form ref="form1" :model="form1" :rules="rules1" label-width="120px">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form1.phone" placeholder="手机号为登录账号" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form1.email"
              placeholder="邮箱为接收验证码邮箱"
            />
          </el-form-item>
          <el-form-item label="邮箱验证码" prop="verifyCode">
            <el-input
              v-model="form1.verifyCode"
              placeholder="邮箱验证码"
              @blur="verifyCode"
            >
              <template slot="append">
                <el-button
                  @click="send"
                  type="primary"
                  :disabled="isDisabled"
                  >{{ buttonName }}</el-button
                >
                <!--<el-button @click="send" type="primary" :disabled="isDisabled">{{buttonName}}</el-button>-->
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="form1.username" placeholder="用户姓名" />
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input
              v-model="form1.password"
              show-password
              autocomplete="new-password"
              placeholder="登录密码"
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              v-model="form1.password2"
              show-password
              autocomplete="new-password"
              placeholder="确认密码"
            />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form1.sex" class="groupStyle">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图片：" :label-width="formLabelWidth">
            <van-uploader
              :after-read="afterRead"
              v-model="fileList"
              :max-count="1"
              action="http://localhost:8099/common/uploadImg"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :preview-full-image="false"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              style="margin-left: 20px;"
              class="footer"
              type="primary"
              :loading="form1Loading"
              @click="submitPsw"
              >{{ form1Loading ? "正在提交" : "提交" }}
            </el-button>
          </el-form-item>
          <el-form-item class="footer">
            已有账号，<span
              @click="jumpLink('/login')"
              style="color:#409eff;cursor: pointer;"
              >去登录</span
            >
          </el-form-item>
        </el-form>
      </section>
    </section>
  </div>
</template>

<script>
import { register, send, verify } from "@/api/user";

import { isPhone, checkPassword, isEmail } from "@/api/validate";
import { mapActions } from "vuex";
let loadingInstance = null;
const userInfo =
  localStorage.getItem("userInfo") &&
  JSON.parse(localStorage.getItem("userInfo"));
export default {
  name: "Register",
  data() {
    return {
      fileList: [], //图片地址
      dialogImageUrl: "",
      dialogVisible: false,
      formLabelWidth: "110px",
      active: 0,
      //steps: ["注册账号", "创建企业", "安全账号", "配置功能"],
      token: "",
      hasRegister: false, // 是否注册
      hasComList: [], // 已注册公司
      form1Loading: false,
      imgUrl: "",
      form1: {
        url: this.imgUrl,
        phone: "",
        email: "",
        // vc: "", // 验证码类型，
        username: "",
        password: "",
        //password2: "",
        // roleList: [{ roleCode: "customer" }],
        //vcToken: "123123",
        verifyCode: "",
        sex: 1
        //registerAccount:''
      },
      buttonName: "发送验证码",
      isDisabled: false,
      time: 30,
      verifyFlag: false,
      //options: [],
      //orgId: "",
      //username:userInfo.userId || '',
      //password:userInfo.password || '',
      username: "",
      password: "",
      nickname: ""
    };
  },
  created() {},
  computed: {
    rules1() {
      const valiPhone = (rule, value, callback) => {
        if (isPhone(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号码"));
        }
      };
      const valEmail = (rule, value, callback) => {
        if (isEmail(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      };
      const checkdPassword = (rule, value, callback) => {
        if (checkPassword(value)) {
          callback();
        } else {
          callback(
            new Error(
              "密码长度8-16位，且必须包含小写字母、大写字母、数字、特殊符号的两种及以上"
            )
          );
        }
      };
      const valiPassword = (rule, value, callback) => {
        if (this.form1.password === value) {
          callback();
        } else {
          callback(new Error("二次输入的密码不一致"));
        }
      };

      return {
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { validator: valiPhone, trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          { validator: valEmail, trigger: "change" }
        ],
        verifyCode: [
          { required: true, message: "请输入短信验证码", trigger: "change" }
        ],
        username: [
          { required: true, message: "请输入姓名", trigger: "change" },
          { max: 20, message: "最大20个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { validator: checkdPassword, trigger: "change" }
        ],
        password2: [
          { required: true, message: "请输入确认密码", trigger: "change" },
          { validator: valiPassword, trigger: "change" }
        ]
      };
    }
  },
  methods: {
    ...mapActions(["setRegisterFlag", "onRegister"]),

    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // } ,

    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    // 弹出菜单 上传成功/失败调用
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3)
    },

    // 上传成功,赋值附件
    handSuccess(response, file, fileList) {
      console.log("ewe", response.data.url);
      this.form1.url = response.data.url;
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
    jumpLink(url) {
      this.$router.push({
        path: url
      });
    },
    // 获取验证码
    send() {
      let me = this;
      me.isDisabled = true;
      let interval = window.setInterval(function() {
        me.buttonName = "（" + me.time + "秒）后重新发送";
        --me.time;
        if (me.time < 0) {
          me.buttonName = "重新发送";
          me.time = 30;
          me.isDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
      send({ email: this.form1.email }).then(data => {
        this.form1.verifyCode = data;
        // this.$message({
        //   message: "验证码发送成功",
        //   type: "success"
        // });
      });
    },
    verifyCode() {
      //如果验证码校验通过，是onblur事件失效
      if (this.verifyFlag) {
        return;
      }
      verify({
        registerAccount: this.form1.email,
        verifyCode: this.form1.verifyCode
      }).then(data => {
        this.verifyFlag = true;
        //   this.$message({
        //   message: "请输入正确验证码",
        //   type: "error"
        // });
      });
    },

    submitPsw() {
      this.$refs.form1.validate(validate => {
        if (validate) {
          this.form1Loading = true;
          register(this.form1)
            .then(data => {
              console.log(data);
              this.onRegister({
                username: data,
                password: this.form1.password
              });
              this.$alert(`注册成功！您的账号为${data}`, "提示", {
                type: "success",
                confirmButtonText: "去登录",
                showClose: false,
                callback: () => {
                  this.$router.push({
                    path: "/login"
                  });
                }
              });
            })
            .finally(() => {
              this.form1Loading = false;
            });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .van-icon {
   position: absolute;
  display: inline-block;
  font: normal normal normal 14px/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
// /deep/ .el-upload {
//   height: 140px;
//   width: 140px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

.line {
  line-height: 1.5;
}

.register-container {
  align-items: center;
  // background: url("../assets/img/s0.jpg") no-repeat left center;
  background-size: cover;
  background-position-x: right;
  height: 100%;
  overflow: auto;
}

.container {
  padding-top: 50px;
  min-height: 700px;
  background: pink;
  width: 800px;
  margin: 30px auto;
  box-shadow: 0px 0px 10px #c0c0c0;
  border-radius: 10px;
  opacity: 0.8;
  // padding: 50px 0;
  background: white;
}

.steps {
  margin: 0 auto 50px;
}

.form-container {
  width: 600px;
  margin: 0 auto;
}

.goLoginBtn {
  display: block;
  width: 480px;
  margin: 50px auto 22px;
}

.avatar-uploader .el-upload {
  border: 2px dashed #19d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.groupStyle {
  margin-left: 30px;
}
.footer {
  text-align: center;
  margin-left: -100px;
}
</style>
