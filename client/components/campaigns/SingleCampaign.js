import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  Card,
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogActions
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import CampaignCard from './CampaignCard'
import AddAdvert from './AddAdvert'
import { fetchUserAds } from '../../store'

const StyledTileBar = withStyles({
  titleWrap: {
    marginLeft: 0
  },
  title: {
    color: '#000',
    marginLeft: 0
  },
  subtitle: {
    color: '#000'
  }
})(GridListTileBar)

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  card: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    /* bring your own prefixes */
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    boxShadow: '0px'
  },
  tileBar: {
    marginLeft: 0,
    color: '#000',
    background: '#fff'
  },
  button: {
    left: '50%'
  },
  title: {
    textAlign: 'center'
  }
}

class SingleCampaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCampaign: props.selectedCampaign,
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  async componentDidMount() {
    await fetchUserAds(this.props.currentUser.id)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    console.log('closed')
    this.setState({ open: false })
  }

  render() {
    const { selectedCampaign, classes, allAds } = this.props
    const { open } = this.state
    console.log('state', this.state)
    console.log('selected campaign', selectedCampaign)
    console.log('demographics', selectedCampaign.demographics)
    return (
      selectedCampaign && (
        <div>
          <CampaignCard
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            selectedCampaign={selectedCampaign}
            ads={this.props.allAds}
          />

          <Dialog fullScreen={true} open={open} onClose={this.handleClose}>
            <Grid container justify="center">
              <DialogTitle>Add advertisements</DialogTitle>
              <Grid item xs={10}>
                <DialogContent>
                  <DialogContentText className={classes.title}>
                    Choose from your existing advertisements to add to this
                    campaign or create a new advertisement.
                  </DialogContentText>
                  <AddAdvert ads={allAds} campId={selectedCampaign.id} />
                </DialogContent>
                <Grid className={classes.grid}>
                  <Button className={classes.button} onClick={this.handleClose}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Dialog>
        </div>
      )
    )
  }
}

const mapState = state => {
  return {
    selectedCampaign: state.campaigns.singleCampaign,
    allAds: state.ads.allAds,
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllAds: userId => dispatch(fetchUserAds(userId))
  }
}

export default withStyles(styles)(
  connect(mapState, mapDispatch)(SingleCampaign)
)
