import request from '@/utils/request'

const userApi = {
  Login: '/user/common/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return {
    avatar: 'avatar.jpg',
    name: 'admin',
    role: { id: 'admin', name: '管理员', permissions: [ { 'roleId': 'admin', 'permissionId': 'admin' } ] }
  }
}

export function getUserInfo (parameter) {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    data: parameter
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return {
    avatar: 'avatar.jpg',
    name: 'admin',
    role: { id: 'admin', name: '管理员', permissions: [ { 'roleId': 'admin', 'permissionId': 'admin' } ] }
  }
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
