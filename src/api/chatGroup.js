import request from "@/api/request";

/** 创建群组 */
export function createGroup(data){
  return request({
    url: '/chatGroup/create',
    method:'post',
    data
  })
}

/** 查询我的群组 */
export function queryGroup(data){
  return request({
    url:'/chatGroup/query',
    method:'get',
    data
  })
}

/** 获取系统内群组信息 */
export function fetchMyGroup(data){
  return request({
    url: '/chatGroup/queryMyGroup',
    method:'get',
    data
  })
}

/** 添加群组申请  */
export function groupApply(data){
  return request({
    url:'/',
    method:'post',
    data
  })
}

export function delGroup(data){
  return request({
    url:'/chatGroup/del',
    method:'delete',
    data
  })
}
