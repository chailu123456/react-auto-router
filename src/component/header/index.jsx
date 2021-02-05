import React, { Component } from 'react';

import './index.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount(){
    // console.log(this.props);
  }
 
  render() { 
    return ( 
      <div className="do-header">
        <p>测试环境：柴璐-146</p>
      </div>
     );
  }
}
 
export default Header;