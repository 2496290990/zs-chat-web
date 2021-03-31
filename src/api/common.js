import request from "@/api/request";
/** 通用文件上传 */
export function uploadImage(data){
  return request({
    url: "/commons/uploadImg",
    method: "POST",
    data
  })
}
