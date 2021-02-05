import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import './index.scss';
import routesArr from '../../routers';

function navList(routesArr) {
  return routesArr.map((item, index) => {
    let result = null;
    result = (
      <div className="nav-list-show" key={item.path}>
          {
            item.routes && item.routes.length && !item.ismenu
            ? (
              <React.Fragment>
                <Link className="nav-parent" to={item.routes[0].path}>{item.name}</Link>
                <div className="nav-tab">
                  {
                    navList(item.routes)
                  }
                </div>
              </React.Fragment>
            )
            : <Link className="nav-child" to={item.path}>{item.name}</Link> 
          }
      </div>
    )
    return result
  })
}

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount(){
    // console.log(this.props);
  }
 
  render() { 
    return ( 
      <div className="nav-list">
          <h1>Boss</h1>
          {
            navList(routesArr)
          }
      </div>
     );
  }
}
 
export default NavLeft;