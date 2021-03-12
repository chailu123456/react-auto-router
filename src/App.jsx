import React, { Component } from 'react';
import NavLfet from  './component/navLeft'; 
import Header from  './component/header'; 
import { HashRouter as Router, Route,Redirect, Switch } from 'react-router-dom'
import AsyncComponent from './AsyncComponent'
import routesArr from './routers'; //
import routesArrPage from './routePage?getRouter';
import Test from './testpage?testing';
import './style/index.scss';
console.log(8888,routesArrPage);

console.log('==='+ JSON.stringify(Test));
// 调用 AsyncComponent
(function initRouter(routesArrPage){
  routesArrPage.forEach((item) => {
    item.component = AsyncComponent(item.component)
    if(item.routes.length > 0) {
      initRouter(item.routes)
    }
  })
})(routesArrPage)


let arr = []; // 所有路由遍历成一级路由
let redirect = null;
function routesOperation(routesArr) {
  routesArr.forEach(item => {
    let obj = {};
    obj.name = item.name;
    obj.path = item.path;
    obj.component = item.component;
    if(obj.exact) {
      obj.exact = item.exact;
    }
    arr.push(obj)
    if(item.routes && item.routes.length > 0) {
      routesOperation(item.routes)
    }
  })
}
routesOperation(routesArr)
// console.log(arr)
class App extends Component{
  constructor() {
    super()
    this.state= {
      C: null
    }
  }

  // 遍历所有路由为同级路由
  renderComponent(arr, redirect) {
    console.log(arr)
    // if (redirect) {
    //     return <Redirect key={arr.redirect} from={route.path} to={route.redirect}/>
    // }
    return (
      <React.Fragment>
        {
          arr.map((item) => {
            return <Route key={item.path} exact path={item.path} render={(props) => (
              <item.component {...props} />
            )} />
          })
        }
        <Redirect key={Date.now()} path="/" to={{pathname: '/geek/platform'}}  />
      </React.Fragment>
    )
  }

  // 遍历嵌套路由
  pagerouter(routesArr) {
    console.log('routesArr',routesArr); 
    return routesArr.map((item,ind)=>{

      return (
        <Route key={ind} path={item.path} render={(props) => (
          <item.component {...props}>
            {
              item.routes && item.routes.length > 0
              ? (
                <Switch>
                  {
                    this.pagerouter(item.routes)
                  }
                  <Redirect to="/error" />
                </Switch>
              ) : null
            }
          </item.component>
        )} />
      )
    })
  }

  async componentDidMount() {
 
  }
  render() {
    // console.log(this.pagerouter(routesArr));
    // console.log(this.renderComponent(arr));
    return (
      <Router>
        <div className="do-project">
          <div className="do-project-menulist">
            <NavLfet />
          </div>
          <div className="do-project-content">
            <Header></Header>
            <div className="content-show">
              {/* 嵌套路由操作 */}
              {
                // this.pagerouter(routesArrPage)
              }
              {/* 同级路由操作 */}
              {
                this.renderComponent(arr)
              }
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
export default App;
