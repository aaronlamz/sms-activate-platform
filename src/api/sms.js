import { post, get } from './request'

// 获取接码号码接口
export function getSmsNumber(data) {
  return post('/sms/getNumber', data)
}

// 发送短信接口
export function sendSms(data) {
  return post('/sms/send', data)
}
