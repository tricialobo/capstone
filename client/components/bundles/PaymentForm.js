import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import {
  Select,
  FormControl,
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  InputLabel,
  Divider
} from '@material-ui/core'
import CheckoutCard from './CheckoutCard'

const styles = theme => ({
  container: {
    width: '100%',
    flexGrow: 1,
    margin: 'auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  formControl: {
    minWidth: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 400
  }
})

const PaymentForm = props => {
  const { classes, handleChange, handleSubmit, address, campaign } = props

  return (
    <Grid
      container
      className={classes.container}
      direction="row"
      justify="center"
      spacing={32}
    >
      <Grid item xs={3}>
        <Typography variant="title">Payment details</Typography>
        <br />
        <Divider />
        <br />
        <Typography variant="subheading">
          Total: {campaign.price} ETH{' '}
        </Typography>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container alignContent="center" direction="column">
            <Grid>
              <TextField
                id="eth-address"
                label="Ethereum address"
                name="address"
                className={classes.textField}
                value={address}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid>
              <Button
                minWidth="100%"
                type="submit"
                className={classes.textField}
              >
                Submit payment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={9}>
        <CheckoutCard campaign={campaign} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PaymentForm)
