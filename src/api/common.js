import request from "@/api/request";
/** 通用文件上传 */
export function sendEmail(data){
  return request({
    url: '/register/sendChange',
    method:'get',
    data
  })
}
