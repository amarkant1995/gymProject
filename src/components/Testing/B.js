import React, { Component } from 'react'

export default class B extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
  render() {
    return (
      <div>
        I am B
      </div>
    )
  }
}
