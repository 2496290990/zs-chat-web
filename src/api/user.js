import request from "@/api/request";

// 登录
export function login(data) {
  return request({
    url: `/oauth/login`,
    method: "post",
    data
  });
}
// 注册
export function register(data) {
  return request({
    url: "/register/reg",
    method: "post",
    data,
  });
}
// 验证码
export function send(data) {
  return request({
    url: `/register/send`,
    method: "get",
    data
  });
}
// 验证码校验
export function verify(data) {
  return request({
    url: `/register/verify`,
    method: "post",
    data
  });
}

// 获取用户信息    /user​/getUser
export function getUser(data) {
  return request({
    url: "/user/getUser",
    method: "get",
    data
  });
}
/** 编辑用户信息*/
export function editUser(data) {
  return request({
    url: "/user",
    method: "put",
    data
  });
}

/**获取好友列表*/
export function getFriendList(){
  return request({
    url:'/myFriend/query',
    method:'get'
  })
}
/** 根据输入内容查询用户*/
export function queryUser(data){
  return request({
    url:'/user/queryUser',
    method:'get',
    data
  })
}

