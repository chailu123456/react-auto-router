
import Geek from  '../pages/geek'; 
import Poibrands from  '../pages/geek/poibrands'; 
import platform from  '@/pages/geek/platform'; 
import analysis from  '@/pages/analysis'; 
import mainOverview from  '@/pages/analysis/mainOverview'; 
import sdkMonitor from  '@/pages/analysis/sdkMonitor'; 
import tools from  '@/pages/tools'; 
import maptrilTwo from  '@/pages/tools/maptrilTwo'; 
import scenceCheck from  '@/pages/tools/scenceCheck'; 
import scenceCheckone from  '@/pages/tools/scenceCheck/one'; 
import scenceChecktwo from  '@/pages/tools/scenceCheck/two'; 

import Error from  '@/pages/404'; 

let routesArr = [
  {
    path: '/geek',
    component: Geek,
    name: '及刻数据运营',
    exact: true,
    routes: [
      {
        path: '/geek/platform',
        name: '平台场景管理',
        component: platform
      },
      {
        name: '场景品牌管理',
        path: '/geek/poibrands',
        component: Poibrands
      }
    ]
  },
  {
    path: '/analysis',
    component: analysis,
    name: '及刻数据分析',
    routes: [
      {
        name: '统计分析',
        path: '/analysis/mainOverview',
        component: mainOverview
      },
      {
        name: 'sdk数据监控',
        path: '/analysis/sdkMonitor',
        component: sdkMonitor
      }
    ]
  },
  {
    name: '工具类',
    path: '/tools',
    component: tools,
    routes: [
      {
        name: '轨迹数据分析',
        path: '/tools/maptrilTwo',
        component: maptrilTwo
      },
      {
        name: '场景检查',
        path: '/tools/scenceCheck',
        component: scenceCheck,
        ismenu: true,
        routes: [
          {
            name: '场景111',
            path: '/tools/scenceCheck/one',
            component: scenceCheckone,
            routes: []
          },
          {
            name: '场景检查2',
            path: '/tools/scenceCheck/two',
            component: scenceChecktwo,
            routes: []
          }
        ]
      }
    ]
  }
  
]

export default routesArr;