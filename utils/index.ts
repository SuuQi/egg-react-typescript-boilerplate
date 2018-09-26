/*
 * @Author: suqin 
 * @Date: 2018-08-15 14:19:21 
 * @Last Modified by: suqin@corp.netease.com
 * @Last Modified time: 2018-08-15 14:30:47
 * @description: 前后端公共的utils
 */


/** 生成随机字符串  */
export function randomString () {
    return Math.random().toString(36).substring(2, 15);
}
