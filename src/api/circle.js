import request from "@/api/request";

/** 发表 */
export function submitCircle(data){
  return request({
    url:'/circleOfFriend/publish',
    method:'POST',
    data
  })
}

/** 拉取评论列表 */
export function fetchCircleList(data){
  return request({
    url:'/circleOfFriend/list',
    method:'GET',
    data
  })
}

/** 发表评论  */
export function publishReview(data){
  return request({
    url:'/review/insert',
    method:'POST',
    data
  })
}

/** 更新朋友圈信息 */
export function updateCircle(data){
  return request({
    url:'/circleOfFriend/update',
    method:'PUT',
    data
  })
}


