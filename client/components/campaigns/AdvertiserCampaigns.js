import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  Grid,
  GridList,
  GridListTile
} from '@material-ui/core'
import AdsGridList from '../ads/AdsGridList'
import CampaignsAccordion from '../ads/CampaignsAccordion'
import LoadingScreen from '../LoadingScreen'
import CampaignsList from './CampaignsList'
import CreateCampaignDialog from '../ads/CreateCampaignDialog'
import SingleCampaign from './SingleCampaign'
import {
  fetchSingleCampaign,
  setCampaign,
  fetchAllUserCampaigns
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

  componentDidMount () {
    this.props.fetchCampaign(this.props.allCampaigns[0])
  }

  handleListItemClick = (event, index, campaign) => {
    this.setState({ selectedIndex: index })
    this.props.loadSingleCampaign(campaign.id)
    history.push(`/campaigns/campaign/${campaign.id}`)
  }

  render() {
    const { classes, allCampaigns, allAds, loadSingleCampaign } = this.props
    const selectedCampaign = this.state.selectedCampaign
    console.log(this.state.selectedCampaign)
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
                  <h1>SelectedCampaign: {this.props.selectedCampaign.name}</h1>
                </Grid>
              </Grid>
              <Button onClick={this.handleOpen}>Create a campaign</Button>
              <CreateCampaignDialog
                open={this.state.open}
                onClose={this.handleClose}
                campaigns={allCampaigns}
              />
            </div>
          )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allAds: state.ads.allAds,
    allCampaigns: state.campaigns.allUserCampaigns,
    selectedCampaign: state.campaigns.singleCampaign
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
    // setCampaign: campaign => {
    //   dispatch(setCampaign(campaign))
    // }
  }
}
const AdvertiserCampaigns = withStyles(styles)(AdvertiserCampaignsModal)
export default withStyles(styles)(
  connect(mapState, mapDispatch)(AdvertiserCampaigns)
)
