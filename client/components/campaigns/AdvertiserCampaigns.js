import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card
} from '@material-ui/core'
import CampaignsList from './CampaignsList'
import CampaignForm from './CampaignForm'
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
  },
  dialog: {
    height: 700
  }
})

class AdvertiserCampaigns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      price: 0,
      selectedIndex: 0,
      selectedDemographics: [...props.selectedDemographics]
    }
    this.handleListItemClick = this.handleListItemClick.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  async componentDidMount() {
    await this.props.me()
    await this.props.loadAllUserCampaigns(this.props.currentUser.id)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
      selectedDemographics: this.props.selectedDemographics
    })
  }

  handleCreate(evt) {
    evt.preventDefault()
    const name = evt.target.name.value
    const advertiserId = this.props.currentUser.id
    const price = this.state.price
    const demographics = this.state.selectedDemographics.filter(
      demographic => demographic.checked
    )
    const newCampaign = {
      advertiserId: advertiserId,
      name: name,
      price: price,
      demographics: demographics
    }
    this.props.createCampaign(newCampaign, this.props.currentUser.id)
    this.handleClose()
  }

  async componentDidMount() {
    await this.props.fetchCampaign(this.props.allCampaigns[0])
    await this.props.loadAllUserCampaigns(this.props.currentUser.id)
  }

  handleListItemClick = (event, index, campaign) => {
    this.props.selectCampaign(campaign)
    this.setState({ selectedIndex: index })
  }

  render() {
    const { classes, allCampaigns, currentUser, selectedCampaign } = this.props
    const { selectedDemographics, price } = this.state
    return (
      <div className="container">
        {allCampaigns &&
          allCampaigns.length && (
            <div>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <CampaignsList
                    campaigns={allCampaigns}
                    handleListItemClick={this.handleListItemClick}
                    selectedIndex={this.state.selectedIndex}
                    handleOpen={this.handleOpen}
                  />
                </Grid>
                <Grid item xs={9}>
                  {selectedCampaign && (
                    <SingleCampaign selectedCampaign={selectedCampaign} />
                  )}
                </Grid>
              </Grid>
              <Dialog
                fullScreen={true}
                open={this.state.open}
                onClose={this.handleClose}
              >
                <Grid container direction="column" alignItems="center">
                  <DialogTitle>New campaign</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Name your new ad campaign, its price, and which categories
                      it can be associated with.
                    </DialogContentText>
                    <CampaignForm
                      price={price}
                      open={open}
                      handleClose={this.handleClose}
                      selectedDemographics={selectedDemographics}
                      formAction={this.handleCreate}
                    />
                  </DialogContent>
                </Grid>
              </Dialog>
            </div>
          )}
        <div>
          <Route
            path="/campaigns/campaign/:campaignId"
            render={() => (
              <SingleCampaign selectedCampaign={selectedCampaign} />
            )}
          />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  const demographics = state.demographics.allDemographics
  let demographicsArray = []
  for (let i = 0; i < demographics.length; i++) {
    demographicsArray.push({
      id: demographics[i].id,
      name: demographics[i].name,
      checked: false
    })
  }
  return {
    allCampaigns: state.campaigns.allUserCampaigns,
    selectedCampaign: state.campaigns.singleCampaign,
    selectedDemographics: demographicsArray,
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    selectCampaign: campaign => {
      dispatch(setCampaign(campaign))
    },
    loadAllUserCampaigns: userId => {
      dispatch(fetchAllUserCampaigns(userId))
    },
    loadSingleCampaign: campaignId => {
      dispatch(fetchSingleCampaign(campaignId))
    },
    fetchCampaign: campaign => {
      dispatch(setCampaign(campaign))
    },
    createCampaign: campaign => {
      dispatch(postCampaign(campaign))
    },
    editCampaign: campaignId => dispatch(editCampaign(campaignId)),
    deleteCampaign: campaignId => dispatch(removeCampaign(campaignId))
  }
}

export default withStyles(styles)(
  connect(mapState, mapDispatch)(AdvertiserCampaigns)
)
