import request from "@/api/request";

export function saveHistory(data){
  return request({
    url:'/chatHistory/save',
    method:'POST',
    data
  })
}
