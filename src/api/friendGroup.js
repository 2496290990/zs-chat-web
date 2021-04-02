import request from "@/api/request";

export function fetchGroup(data){
  return request({
    url:'/friendGroup/list',
    method:'get',
    data
  })
}
