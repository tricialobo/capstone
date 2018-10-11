import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, GridList, GridListTile } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import AdsGridList from '../ads/AdsGridList'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  card: {
    minWidth: '100%'
  },
  container: {
    height: 500
  },
  details: {
    minWidth: '100%'
  },
  content: {
    paddingTop: 5
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  button: {
    justifyContent: 'start'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

const CheckoutCard = props => {
  const { campaign, classes } = props
  const demographics = campaign.demographics
  const advertisements = campaign.advertisements
  return (
    <Grid container className={classes.container}>
      <Card className={classes.card}>
        <CardHeader title={campaign.name} />
        <CardContent className={classes.content}>
          <Grid container direction="row" spacing={40}>
            <Grid item xs={2}>
              <Grid container direction="column">
                <Grid>
                  <Typography variant="subheading">Demographics</Typography>
                  {demographics &&
                    demographics.length &&
                    demographics.map(demographic => (
                      <Typography key={demographic.id} variant="body1">
                        {demographic.name}
                      </Typography>
                    ))}
                </Grid>
              </Grid>
            </Grid>
            {advertisements && advertisements.length ? (
              <Grid item xs={10}>
                <AdsGridList ads={advertisements} />
              </Grid>
            ) : (
              <Grid item container justify="center">
                <Typography variant="subheading">
                  There are currently no advertisements in this campaign.
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(CheckoutCard)
