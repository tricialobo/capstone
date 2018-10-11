import React, { Component } from 'react'
import {
  getAllCampaigns,
  addToBundle,
  getAllBundles,
  setBundle
} from '../store'
import { withStyles } from '@material-ui/core/styles'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AllBundles from './allBundles'
import AdsGalleryGridList from './ads/AdsGalleryGridList'
import { ListItem, List, Grid, Typography, Button } from '@material-ui/core'

const styles = theme => ({
  titleText: {
    fontSize: '32px',
    fontWeight: '700'
  },
  campaignTitle: {
    fontSize: '24px',
    fontWeight: '600'
  }
})

class AllCampaigns extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllCampaigns()
    await this.props.getAllBundles(this.props.user.id)
    await this.props.setBundle(this.props.bundles[0])
  }

  async handleClick(evt, campaign) {
    if (this.props.campaignsInBundle.length) {
      const ids = this.props.campaignsInBundle.map(camp => camp.id)
      if (ids.includes(campaign.id)) {
        alert(
          `${campaign.name} campaign is already in ${
            this.props.bundle.projectName
          }`
        )
      } else {
        await this.props.addToBundle(campaign, this.props.bundle.id)
        alert(`${campaign.name} added to ${this.props.bundle.projectName}`)
      }
    } else {
      await this.props.addToBundle(campaign, this.props.bundle.id)
      alert(`${campaign.name} added to ${this.props.bundle.projectName}`)
    }
  }

  render() {
    const { classes } = this.props
    const campaigns = this.props.campaigns
    const filtCamps = campaigns.filter(camp => camp.advertiser.balance > 0)
    if (this.props.bundle) {
      return (
        <Grid container direction="row">
          <Grid item xs={4}>
            <AllBundles />
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.titleText} variant="title">
              Available Campaigns
            </Typography>
            <List>
              {campaigns &&
                campaigns.length &&
                filtCamps.map(campaign => (
                  <ListItem key={campaign.id}>
                    <Grid container direction="column">
                      <Grid container direction="row">
                        <Grid item xs={10}>
                          <Typography
                            className={classes.campaignTitle}
                            variant="subheading"
                          >
                            {campaign.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                        
                          <Button
                            onClick={evt => this.handleClick({ evt }, campaign)}
                          >
                            add to {this.props.bundle.projectName}
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <AdsGalleryGridList ads={campaign.advertisements} />
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      )
    } else return null
  }
}

const mapState = state => {
  return {
    campaigns: state.campaigns.allCampaigns,
    bundle: state.bundles.bundle,
    bundles: state.bundles.allBundles,
    campaignsInBundle: state.bundles.campaignsInBundle,
    user: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    getAllCampaigns: () => dispatch(getAllCampaigns()),
    addToBundle: (campaign, bundleId) =>
      dispatch(addToBundle(campaign, bundleId)),
    getAllBundles: userId => dispatch(getAllBundles(userId)),
    setBundle: bundle => dispatch(setBundle(bundle))
  }
}

export default withStyles(styles)(
  withRouter(connect(mapState, mapDispatch)(AllCampaigns))
)
