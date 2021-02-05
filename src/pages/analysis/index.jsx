import React, { Component } from 'react';
// import { HashRouter as Router, Route, Link  } from 'react-router-dom';
export default class Geek extends Component{
  constructor() {
    super()
    this.state= {}
  }
  render() {
    return (
      <div className='content'>{this.props.children}</div>
    )
  }
}
