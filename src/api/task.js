/**
 * @file task.js
 * @description 任务相关接口
 * @author YIBOSHEN
 * @date 07-15-2020
 */
import request from '@/utils/request'

/**
 * 任务提测
 * @param clientId 客户id
 * @param appName 应用名称
 * @param serviceId 服务id
 * @param preAmount 预计额度
 * @param preDate 预计测试日期
 * @param expEndDat 期望结单日期
 * @param manageId 客户服务经理id
 */
export function addTask({ clientId, appName, serviceId, preAmount, preDate, expEndDate, manageId }) {
  return request({
    url: '/v1/task',
    method: 'post',
    data: {
      clientId,
      appName,
      serviceId,
      preAmount,
      preDate,
      expEndDate,
      manageId
    }
  })
}

/**
 * 任务列表
 * @param status 状态
 * @param pageSize
 * @param pageNum
 */
export function taskList({ status, pageSize, pageNum }) {
  return request({
    url: `/v1/task/list?status=${status}&pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'get'
  })
}

/**
 * 单个任务
 * @param id 任务id
 */
export function getOneTask({ id }) {
  return request({
    url: `/v1/task/${id}`,
    method: 'get'
  })
}

/**
 * 任务取消
 * @param id 任务id
 * @param userId 操作人id
 * @param reason 取消原因
 */
export function cancelTask({ id, userId, reason }) {
  return request({
    url: `/v1/task/cancel/${id}`,
    method: 'put',
    data: {
      userId,
      reason
    }
  })
}

/**
 * 任务确认
 * @param id 任务id
 */
export function confirmTask({ id }) {
  return request({
    url: `/v1/task/confirm/${id}`,
    method: 'put'
  })
}

/**
 * 任务信息录入
 * @param id 任务id
 *  Version         string `gorm:"size:30;comment:'测试版本'" json:"version"`
    PkgAddress      string `gorm:"size:256;comment:'安装包地址'" json:"pkgAddress"`
    TestType        string `gorm:"comment:'环境类型'" json:"testType"`
    TestExtInfo     string `gorm:"size:256;comment:'测试环境补充信息'" json:"testExtInfo"`
    WhiteList       string `gorm:"size:512;comment:'白名单'" json:"whiteList"`
    TestAccountType string `gorm:"size:40;comment:'测试账号类型'" json:"testAccountType"`
    AccountReUse    int    `gorm:"type:tinyint;default:0;comment:'账号是否重复使用'" json:"reUse"`
    AccountAddress  string `gorm:"size:256;comment:'账号文件地址'" json:"accountAddress"`
    ChangeLog       string `gorm:"size:256;comment:'变更说明'" json:"changeLog"`
    AccountNum      int    `gorm:"comment:'账号数量'" json:"accountNum"`
    PhoneNum        int    `gorm:"comment:'手机号/微信数量'" json:"phoneNum"`
    ConcurrentNum   int    `gorm:"comment:'并发数'" json:"concurrentNum"`
    ReqPhone        string `gorm:"size:256;comment:'机型需求'" json:"reqPhone"`
    ExtReq          string `gorm:"size:256;comment:'其他需求'" json:"extReq"`
    InstanceTxt     string `gorm:"size:256;comment:'文字用例内网地址'" json:"instanceTxt"`
    InstanceMv      string `gorm:"size:256;comment:'视频用例内网地址'" json:"instanceMv"`
 */
export function saveTaskInfo({ id, data }) {
  return request({
    url: `/v1/task/save/${id}`,
    method: 'post',
    data
  })
}

/**
 * 任务冻结
 * @param id 任务id
 */
export function frozenTask({ id }) {
  return request({
    url: `/v1/task/frozen/${id}`,
    method: 'put'
  })
}

/**
 * 任务指派
 * @param id 任务id
 * {
    "amount": 0,
    "exeUserId": 0
  }
 */
export function assignTask({ id, data }) {
  return request({
    url: `/v1/task/assign/${id}`,
    method: 'put',
    data
  })
}

/**
 * 任务启动执行
 * @param id 任务id
 */
export function executeTask({ id }) {
  return request({
    url: `/v1/task/execute/${id}`,
    method: 'put'
  })
}

/**
 * 暂停任务
 * @param id 任务id
 */
export function stopTask({ id }) {
  return request({
    url: `/v1/task/pause/${id}`,
    method: 'put'
  })
}

/**
 * 标签列表
 * @param id 任务id
 */
export function tagsTask() {
  return request({
    url: `/v1/task/tags`,
    method: 'get'
  })
}

/**
 * 任务完成
 * @param id 任务id
 *"delayTime": 0,
  "desc": "string",
  "executeBatch": 0,
  "executeTai": 0,
  "tags": [
    0
  ],
  "usedTime": 0
 */
export function finishTask({ id, data }) {
  return request({
    url: `/v1/task/finish/${id}`,
    method: 'put',
    data
  })
}

/**
 * 任务结单
 * @param id 任务id
 */
export function endTask({ id, data }) {
  return request({
    url: `/v1/task/end/${id}`,
    method: 'put',
    data
  })
}

/**
 * 评价
 * @param id 任务id
 */
export function commentTask({ id, data }) {
  return request({
    url: `/v1/task/comment/${id}`,
    method: 'put',
    data
  })
}

/**
 * 获取评价
 * @param id 任务id
 */
export function getCommentTask({ id, data }) {
  return request({
    url: `/v1/task/comment/${id}`,
    method: 'get',
    data
  })
}

/**
 * 结单任务
 * @param type 默认今天，1明天
 */
export function getFocusList({ type = '' }) {
  return request({
    url: `/v1/task/focus?type=${type}`,
    method: 'get'
  })
}

/**
 * 任务看板
 */
export function getDashboardData() {
  return request({
    url: `/v1/task/dashboard`,
    method: 'get'
  })
}

/**
 * 亟需关注
 */
export function getHightData() {
  return request({
    url: `/v1/task/high`,
    method: 'get'
  })
}

