import request from "@/api/request";

export function fetchGroup(data){
	return request({
		url: "/friendGroup/list",
		method: "get",
		data
	});
}
// 保存
export function updateList(data){
	return request({
		url: "/friendGroup/updateList",
		method: "put",
		data
	});
}
