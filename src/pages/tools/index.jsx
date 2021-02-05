import React, { Component } from 'react';
// import { HashRouter as Router, Route, Link  } from 'react-router-dom';
export default class Geek extends Component{
  constructor() {
    super()
    this.state= {}
  }
  componentDidMount() {
    console.log(this.props);
    console.log(1234);
  }
  render() {
    return (
      <div className='content'>{this.props.children}</div>
    )
  }
  
}
