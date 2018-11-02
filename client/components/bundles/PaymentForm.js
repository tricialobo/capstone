import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography, TextField, Divider } from '@material-ui/core'
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
  },
  paymentText: {
    textAlign: 'center'
  }
})

const PaymentForm = props => {
  const { classes, handleChange, handleSubmit, address, campaign, paid } = props
  console.log('CAMPAIGN', campaign)
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
        {paid && (
          <Typography variant="body1" color="primary">
            <b>Paid</b>
          </Typography>
        )}
        <br />
        <Divider />
        <br />
        <Typography variant="subheading">Total</Typography>
        <Typography variant="body1">{campaign.price} ETH</Typography>
        <br />
        <Divider />
        <br />
        {!paid ? (
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
                  type="submit"
                  className={classes.textField}
                  onClick={handleSubmit}
                >
                  Submit payment
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Grid container justify="center" className={classes.paymentText}>
            <Grid>
              <Typography variant="subheading">Thank you!</Typography>
            </Grid>
            <Grid>
              <Typography variant="body1">
                Your payment has been received. You will receive an email with a
                payment confirmation and receipt. Your campaign is now active.
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={9}>
        <CheckoutCard campaign={campaign} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PaymentForm)
