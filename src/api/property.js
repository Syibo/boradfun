/**
 * @file property.js
 * @description 设备相关接口
 * @author YIBOSHEN
 * @date 01-13-2021
 */
import request from '@/utils/request'
/**
 * 易耗品列表
 * @param pagenum 页码
 * @param pagesize 页数
 * @param category 类别
 * @param keyword 关键词
 */
export function getLowPriceArticle({ pagenum, pagesize, category, keyword }) {
  return request({
    url: `v1/low_price_article?pagenum=${pagenum}&pagesize=${pagesize}&category=${category}&keyword=${keyword}`,
    method: 'get'
  })
}
/**
 * 创建易耗品
 * @param low_price_article_category 类别
 * @param low_price_article_name 名称
 * @param brand 品牌
 * @param retailer 经销商
 */
export function addLowPriceArticle({ low_price_article_category, low_price_article_name, brand, retailer, site, purchase_price, total_quantity, comment, need_return }) {
  return request({
    url: `v1/low_price_article`,
    method: 'post',
    data: {
      low_price_article_category, low_price_article_name, brand, retailer, site, purchase_price, total_quantity, comment, need_return
    }
  })
}
/**
 * 易耗品详情
 * @param id id
 */
export function lowPriceArticleDetail(id) {
  return request({
    url: `v1/low_price_article/${id}`,
    method: 'get'
  })
}
/**
 * 易耗品借出列表
 * @param pagenum 页码
 * @param pagesize 页数
 */
export function lowPriceArticleUutgoing({ pagenum, pagesize }) {
  return request({
    url: `v1/low_price_article/employee/outgoing?pagenum=${pagenum}&pagesize=${pagesize}`,
    method: 'get'
  })
}

/**
 * 设备列表
 * @param pagenum 页码
 * @param pagesize 页数
 */
export function getDeviceList({ pagenum, pagesize, keyword, device_category, device_status }) {
  return request({
    url: `v1/device?pagenum=${pagenum}&pagesize=${pagesize}&keyword=${keyword}&device_category=${device_category}&device_status=${device_status}`,
    method: 'get'
  })
}
/**
 * 新增设备
 */
export function addDevice(data) {
  return request({
    url: `v1/device`,
    method: 'post',
    data
  })
}
/**
 * 编辑设备
 */
export function editDevice(data) {
  return request({
    url: `v1/device`,
    method: 'put',
    data
  })
}
/**
 * 设备详情
 */
export function deviceDetail(id) {
  return request({
    url: `v1/device/${id}`,
    method: 'get'
  })
}
