import request from "@/api/request";

/** 创建群组 */
export function createGroup(data){
  return request({
    url: '/chatGroup/create',
    method:'post',
    data
  })
}

export function queryGroup(data){
  return request({
    url:'/chatGroup/query',
    method:'get',
    data
  })
}

export function fetchMyGroup(data){
  return request({
    url: '/chatGroup/queryMyGroup',
    method:'get',
    data
  })
}
