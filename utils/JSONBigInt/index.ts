/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 16:46:35 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-29 10:16:34
 * @description: 处理大整数的工具类文件，基于json-bigint第三方库
 */

const JSONbig = require('json-bigint');
const JSONbigString = JSONbig({ storeAsString: true });

/** 包装大数字的前后字符串标识 */
export const BigIntWrap = 'xxbigintxx';

/**
 * 将大数字转换成包装后的字符串，用于传给服务端解析
 * @export
 * @param {(string|number)} bigInt 
 * @returns {string} 包装后的大数字字符串
 */
export function convert (bigInt: string|number) {
    return `${BigIntWrap}${bigInt}${BigIntWrap}`;
}

/**
 * JSON.parse处理含有大整数的string，基于第三方库json-bigint
 * 大整数会自动转成字符串
 * @export
 * @param {string} str 含有大整数的json字符串
 * @returns {object} 解析后的json对象
 */
export function parse (str: string) {
    return JSONbigString.parse(str);
}

/**
 * JSON.stringify处理含有大整数的对象，用于传送给服务层
 * 大整数是经过包装的字符串
 * @export
 * @param {string} str 含有大整数（以特定格式包装）的json对象
 * @returns {string} 处理后的json字符串
 */
export function stringify (json: any) {
    return json && JSON.stringify(json).replace(`"${BigIntWrap}`, '').replace(`${BigIntWrap}"`, '');
}

