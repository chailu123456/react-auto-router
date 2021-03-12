import React, { Component } from 'react';
import Http from '@/api/list'
import {ClearPending} from '@/api/request'
class Poibrands extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    console.log(this);
    return ( <div>
      <h3>场景品牌</h3>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      </div> );
  }

  componentDidMount() {
    this.getdate()
  }
  async getdate() {
    let data1 = await Http.getIcon()
    console.log(data1)
      
  }

  componentWillUnmount () {
    console.log(2222);
    ClearPending()
  }

  
}
 
export default Poibrands;