import React, { Component } from 'react';

import Http from '@/api/list'
import {ClearPending} from '@/api/request'

const s = {
  width: '100px',
  height: '30px',
  margin:'0 20px'
}

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
      <button style={s} onClick={this.aaa}>请求aaa</button>
      <button style={s} onClick={this.bbb}>请求bbb</button>
      <button style={s} onClick={this.ccc}>请求ccc</button>
    </div>
    );
  }

  componentDidMount() {
    // this.getdate()
    // this.aaa()
    this.login()
    
  }

  aaa = async () => {
    let data1 = await Http.getTag()
    this.bbb()
    this.ccc()
    this.getdate()

    console.log(data1);
  }
  bbb = async () => {
    let data1 = await Http.getPlatform()
    console.log(data1);
  }
  ccc = async () => {
    let data1 = await Http.getCitys()
    console.log(data1);
  }

  async login() {
    if(localStorage.getItem('token')) return
    let data = await Http.login({passwd: "846304126",uid: "146"})
    localStorage.setItem('token', data.data.token)
  }

  async getdate() {
    console.log(123);
    // let data = await Http.test()
    // this.setState({iconList: data})
    
    let data1 = await Http.getBrand()
    
    // console.log(data1)
      
  }

  componentWillUnmount () {
    console.log(2222);
    ClearPending()
  }
}
 
export default Platform;