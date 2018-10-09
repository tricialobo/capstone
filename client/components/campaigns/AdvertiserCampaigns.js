import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, Grid } from '@material-ui/core'
import CampaignsList from './CampaignsList'
import CreateCampaignDialog from '../ads/CreateCampaignDialog'
import SingleCampaign from './SingleCampaign'
import {
  fetchSingleCampaign,
  setCampaign,
  fetchAllUserCampaigns,
  postCampaign,
  editCampaign,
  removeCampaign
} from '../../store'
import history from '../../history'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  heading: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  }
})

class AdvertiserCampaignsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedIndex: 0,
      selectedCampaign: props.allCampaigns[0] || {}
    }
    this.handleListItemClick = this.handleListItemClick.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleListItemClick = (event, index, campaign) => {
    this.setState({ selectedIndex: index })
    this.props.loadSingleCampaign(campaign.id)
    history.push(`/campaigns/campaign/${campaign.id}`)
  }

  render() {
    const {
      classes,
      allCampaigns,
      createNewCampaign,
      currentUser,
      loadSingleCampaign
    } = this.props
    const selectedCampaign = this.state.selectedCampaign
    return (
      <div className="container">
        {allCampaigns &&
          allCampaigns.length && (
            <div>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <CampaignsList
                    campaigns={allCampaigns}
                    loadSingleCampaign={loadSingleCampaign}
                    handleListItemClick={this.handleListItemClick}
                    selectedIndex={this.state.selectedIndex}
                  />
                </Grid>
                <Grid item xs={9}>
                  <h1>selected campaign placeholder</h1>
                </Grid>
              </Grid>
              <Button onClick={this.handleOpen}>Create a campaign</Button>
              <CreateCampaignDialog
                open={this.state.open}
                onClose={this.handleClose}
                campaigns={allCampaigns}
                createNewCampaign={createNewCampaign}
                currentUser={currentUser}
              />
            </div>
          )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allCampaigns: state.campaigns.allUserCampaigns,
    selectedCampaign: state.campaigns.allUserCampaigns[0],
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    loadAllUserCampaigns: userId => {
      dispatch(fetchAllUserCampaigns(userId))
    },
    loadSingleCampaign: campaignId => {
      dispatch(fetchSingleCampaign(campaignId))
    },
    fetchCampaign: campaign => {
      dispatch(setCampaign(campaign))
    },
    createCampaign: campaign => dispatch(postCampaign(campaign)),
    editCampaign: campaignId => dispatch(editCampaign(campaignId))
  }
}
const AdvertiserCampaigns = withStyles(styles)(AdvertiserCampaignsModal)

export default withStyles(styles)(
  connect(mapState, mapDispatch)(AdvertiserCampaigns)
)
