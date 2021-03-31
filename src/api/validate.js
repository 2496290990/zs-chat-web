/**
 * 常用验证方法
 */

/**
 * 是否为 外部链接
 *
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 是否为手机号，宽松正则验证
 *
 * @param {String} phone 手机号码
 * @returns {Boolean}
 */
export function isPhone(phone) {
  const reg = /^[1]([3-9])[0-9]{9}$/
  return reg.test(phone)
}

/**
 * 是否为邮箱
 *
 * @param {String} email 邮箱
 * @returns {Boolean}
 */
export function isEmail(email) {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  return reg.test(email)
}

/**
 * 是否为身份证号
 *
 * @param {String} cardID 身份证号码
 * @returns {Boolean}
 */
export function isCardID(cardID) {
  const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  return reg.test(cardID)
}

/**
 * 密码规则验证
 * 必须包含数字、大写字母、小写字母、特殊字符中的两种，8到16位
 *
 * @param {String} password 密码
 * @returns {Boolean}
 */
export function checkPassword(password) {
  // const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/
  const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/
  return reg.test(password)
}
