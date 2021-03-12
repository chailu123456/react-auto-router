
import {Request} from './request'
import Base from './base'

class List extends Request{
  login (data) {
    return this.instance.post('/login', data)
  }
  getBrand () {
    return this.instance.get('/api/common_conf/brand')
  }
  getIcon () {
    return this.instance.get('/api/geek/public_ap?pagesize=20&pagenum=1')
  }
  getTag () {
    return this.instance.get('/api/geek/partner?pnType=2&pnName=&pnId=&pnAddress=')
  }
  getSdk () {
    return this.instance.get('api/geek/general_serv?pagesize=&pagenum=1&sType=-1&tag=&sName=&sId=')
  }
  getCitys () {
    return this.instance.get('/api/geek/poi_chain?pId=&pName=&remark=&pagesize=20&pagenum=1')
  }
  getPartners () {
    return this.instance.get('/api/common_conf/partners')
  }

  getPlatform () {
    return this.instance.get('http://10.10.163.53:8080/api/geek/scene?pagesize=&pagenum=1&parentId=0&pId=&remark=&pName=&pbId=&category1=&category2=&province=%E5%B9%BF%E4%B8%9C%E7%9C%81&city=%E7%8F%A0%E6%B5%B7%E5%B8%82&isCard=&pcSyncFlag=0&isExport=0&pbName=')
  }

}
export default new List()
