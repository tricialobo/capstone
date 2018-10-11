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
import AddAdvert from '../AddAdvert'
import { fetchUserAds } from '../../store'

const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  card: {
    minWidth: '100%'
  },
  details: {
    minWidth: '100%'
  },
  content: {
    paddingTop: 45
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  button: {
    justifyContent: 'start'
  }
}

const CampaignCard = props => {
  const { selectedCampaign, classes } = props
  const demographics = selectedCampaign.demographics
  const advertisements = selectedCampaign.advertisements

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          action={
            <Button
              component={Link}
              to={`/campaign/edit/${selectedCampaign.id}`}
            >
              Edit campaign
            </Button>
          }
          title={selectedCampaign.name}
          subheader={
            selectedCampaign.isActive ? 'Currently active' : 'Inactive'
          }
        />
        <Divider />
        <CardContent className={classes.content}>
          <Grid container direction="row" spacing={40}>
            <Grid item xs={2}>
              <Grid container direction="column">
                <Grid>
                  <Typography variant="subheading">Price</Typography>
                  <Typography variant="body1">
                    {selectedCampaign.price} ETH
                  </Typography>
                </Grid>
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
      <h1>JAN THIS IS JUST ALL ADS BEING RENDERED BELOW, WILL GO AWAY</h1>
      <AddAdvert
        ads={props.ads}
        alreadychosen={advertisements}
        campId={selectedCampaign.id}
      />
    </div>
  )
}

export default withStyles(styles)(CampaignCard)
