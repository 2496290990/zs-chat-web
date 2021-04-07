import request from "@/api/request";

/** 创建群组 */
export function createGroup(data){
  return request({
    url: '/chatGroup/create',
    method:'post',
    data
  })
}
