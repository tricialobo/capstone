import React, { Component } from 'react'
import { getAllCampaigns, addToBundle } from '../store'
import { withStyles } from '@material-ui/core/styles'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DisplayManyCampaigns from './displayManyCampaigns'
import CampaignGridList from './bundles/CampaignsGridList'
import AllBundles from './allBundles'
import CampaignsAccordion from './ads/CampaignsAccordion'
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
  }

  //refactorable?
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
            {campaigns.map(campaign => (
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
  }
}

const mapState = state => {
  return {
    campaigns: state.campaigns.allCampaigns,
    bundle: state.bundles.bundle,
    campaignsInBundle: state.bundles.campaignsInBundle
  }
}

const mapDispatch = dispatch => {
  return {
    getAllCampaigns: () => dispatch(getAllCampaigns()),
    addToBundle: (campaign, bundleId) =>
      dispatch(addToBundle(campaign, bundleId))
  }
}

export default withStyles(styles)(
  withRouter(connect(mapState, mapDispatch)(AllCampaigns))
)
