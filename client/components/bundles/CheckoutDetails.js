import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter as Router, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PaymentForm from './PaymentForm'

const styles = theme => ({
  root: {
    marginTop: '30px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    minWidth: '950px'
  },
  appBar: {
    backgroundColor: '#fff'
  }
})

const CheckoutDetails = props => {
  const { classes, handleSubmit, handleChange, address } = props

  return (
    <Grid container justify="center">
      <div className={classes.root}>
        <Grid item xs={6}>
          <PaymentForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            address={address}
          />
        </Grid>
      </div>
    </Grid>
  )
}

export default withStyles(styles)(CheckoutDetails)
