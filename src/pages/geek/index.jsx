import React, { Component } from 'react';
import Poibrands from  '@/pages/geek/poibrands'; 

// import { HashRouter as Router, Route, Link,  Switch} from 'react-router-dom';
export default class Geek extends Component{
  constructor() {
    super()
    this.state= {}
  }
  componentDidMount() {

  }
  render() {
    console.log(this.props.children);
    const {children }= this.props
    return (
        <div className='content'>
          {children}
        </div>
    )
  }
}
