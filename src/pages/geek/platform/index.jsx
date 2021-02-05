import React, { Component } from 'react';
class Platform extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    console.log(this);
    return ( 
    <div>
      平台场景内容1
    </div>
    );
  }
}
 
export default Platform;