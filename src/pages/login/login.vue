<template>
  <div class="login-container">
    <div class="login-cnt">
      <div class="cnt2">
        <p class="title_logo">校友邦</p>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          style="margin-top: 30px;text-align: center;"
        >
          <el-form-item label="" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              @keyup.enter.native="goLogin"
            />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="goLogin"
            />
          </el-form-item>
          <!-- <el-form-item>
            <div class="tool-cnt">
              <el-checkbox v-model="remember">记住密码</el-checkbox>
              <el-link type="primary" href="/resetPsw" style="line-height: 1.4">忘记密码？</el-link>
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-button
              type="primary"
              class="w-100"
              :loading="loading"
              @click="goLogin"
            >{{ loading ? "正在登录" : "登 录" }}
            </el-button
            >
          </el-form-item>
          <el-form-item class="register-cnt">
            <!-- 还没有账号？<el-link type="primary" href="/register/register" style="line-height: 1.4">马上注册</el-link> -->
            还没有账号？
            <span
              @click="jumpLink('/register')"
              style="color:#409eff;cursor: pointer;"
            >马上注册</span
            >
            <el-button type="text" @click="changePassword()">修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <changePassword v-if="parentData.showDialog" :parentData="parentData"></changePassword>
  </div>
</template>

<script>
import {login} from "@/api/user";
import {getUser} from "@/api/user";
//引入环信api
import SDK from "../../utils/WebIMConfig";
import "./index.less";
import {mapState, mapActions} from "vuex";
import changePassword from '@/components/changePassword/index'

let loadingInstance = null;

export default {
  name: "Login",
  components: {changePassword},
  data() {
    const valiUsername = (rule, value, callback) => {
      if (isPhone(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    const valiPassword = (rule, value, callback) => {
      if (value.trim()) {
        callback();
      } else {
        callback(new Error("请输入密码"));
      }
    };

    return {


      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          {required: true, message: "请输入内容", trigger: "change"}
        ],
        password: [{validator: valiPassword, trigger: "change"}]
      },
      loading: false,
      remember: false,
      redirect: null,
      parentData: {
        showDialog: false
      },
      account:'',
      hxPwd:''
    };
  },
  mounted() {
  },
  methods: {
    userInfo() {
      // Bearer 123123012310123
      getUser()
        .then(res => {
          sessionStorage.setItem("userInfo", res.data.username);
          this.$message({
            message: "登录成功",
            type: "success"
          });

          this.$router.push("/chatroom");
        })
        .finally(() => {
        });
    },
    ...mapActions(["onLogin", "setRegisterFlag", "onRegister"]),
    jumpLink(url) {
      this.$router.push({
        path: url
      });
    },
    // 获取用户信息
    getUserInfo() {
      getUserInfo().then(data => {
        sessionStorage.setItem("userInfo", JSON.stringify(data));
        this.$router.push({
          path: "/index"
        });
      });
    },

    // 登录
    goLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          login(this.loginForm)
            .then(res => {
              let myUser = JSON.stringify(res.data)
              sessionStorage.setItem("user",myUser)
              if(res.code === 200){
                sessionStorage.setItem("MyUser",JSON.stringify(res.data));
                sessionStorage.setItem("Accesstoken", "Bearer " + res.data.accessToken );
                this.account = res.data.account
                this.hxPwd = res.data.hxPwd
                this.onLogin({
                  username: this.account,
                  password: this.hxPwd
                }).then(data => {
                  this.userInfo();
                });
              }else{
                this.$message({
                  type:'error',
                  message:'用户名或密码错误'
                })
              }

            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 修改密码
    changePassword() {
      this.parentData.showDialog = true
    }
  }
};
</script>

<style lang="scss" scoped>
// $bg: #f5f5f5;
// 1100px: 1100px;
// $cnt-height: 480px;
// 600px: 600px;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  // background-color: $bg;
  // background: url("../assets/img/s0.jpg") no-repeat left center;
  background-size: cover;
  background-position-x: right;
}

.login-cnt {
  display: flex;
  justify-content: space-between;
  width: 1100px;
  border-radius: 8px;
  overflow: hidden;

  .cnt1 {
    width: 600px;
  }

  .cnt2 {
    width: 500px;
    padding: 30px 80px;
    margin: 0 auto;
    box-shadow: 0px 0px 10px #c0c0c0;
    border-radius: 10px;
    opacity: 0.8;
    background-color: #fff;
    margin-bottom: 10px;
    width: 1100px - 600px;
    // padding: 30px 80px;
    .title {
      font-size: 20px;
      text-align: left;
      margin-bottom: 20px;
    }

    .title_logo {
      margin-top: 20px;
      font-size: 30px;
      color: #303030;
      font-weight: 600;

      text-indent: 30px;

      margin-bottom: 10px;
    }
  }
}

.title {
  color: #303030;
  font-weight: 600;
  text-align: center;
}

.tool-cnt {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-cnt {
  margin-bottom: 0;
  text-align: center;
}

.bannerCnt {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 100px;

  .bannerCnt-bg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .bannerCnt-body {
    max-width: 600px;
  }

  .bannerCnt-body_title {
    font-size: 34px;
    color: #ffffff;
  }

  .bannerCnt-body_line {
    width: 40px;
    height: 6px;
    background: #ffa70f;
    margin-bottom: 20px;
    margin-top: 5px;
  }

  .bannerCnt-body_text {
    margin-top: 10px;
    margin-bottom: 40px;
    font-size: 20px;
    color: #e7eaec;
  }
}
</style>
<style>
.register-cnt .el-form-item__content {
  line-height: 35px;
}
</style>
