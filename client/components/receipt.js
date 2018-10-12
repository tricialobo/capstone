import React, { Component } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'

export default class Receipt extends Component {
  render() {
    return (
      <Grid container justify="center" alignItems="center">
        <h3>Thank you!</h3>
        <h4>Your payment has been received.</h4>
      </Grid>
    )
  }
}
