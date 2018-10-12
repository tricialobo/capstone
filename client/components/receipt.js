import React, { Component } from 'react'

export default class Receipt extends Component {
  constructor() {
    super()
  }
  render() {
    console.log('in receipt')
    return (
      <div>
        <h3>Thank you!</h3>
        <h4>Your payment has been received.</h4>
      </div>
    )
  }
}
