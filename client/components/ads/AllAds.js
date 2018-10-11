import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button
} from '@material-ui/core'
import AdsGridList from './AdsGridList'
import { postAd, fetchUserAds } from '../../store'
import AdForm from './AdForm'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  card: {
    minWidth: 275
  },
  content: {
    paddingTop: 45
  }
})

class AllAds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleCreate = this.handleCreate.bind(this)
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
    console.log('currently selected', this.state.selectedDemographics)
    console.log('props', this.props.selectedDemographics)
    this.setState({
      open: false
    })
  }

  handleCreate(evt) {
    evt.preventDefault()
    const name = evt.target.name.value
    const advertiserId = this.props.currentUser.id
    const image = evt.target.image.value
    const url = evt.target.url.value
    const newAd = {
      advertiserId: advertiserId,
      name: name,
      image: image,
      url: url
    }
    this.props.createAd(newAd)
    this.handleClose()
  }

  render() {
    const { classes, ads, handleCreate } = this.props
    return (
      <div className="container">
        {ads &&
          ads.length && (
            <Grid container justify="center">
              <Grid item xs={10}>
                <Card className={classes.card}>
                  <CardHeader
                    action={
                      <Button onClick={this.handleOpen}>
                        New Advertisement
                      </Button>
                    }
                    title="Advertisements"
                  />
                  <CardContent className={classes.content}>
                    <AdsGridList ads={ads} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        <Dialog
          fullScreen={true}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Grid container direction="column" alignItems="center">
            <DialogTitle>New advertisement</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Name your new ad, upload its corresponding image, and set the
                click-through link.
              </DialogContentText>
              <AdForm
                open={open}
                handleClose={this.handleClose}
                formAction={this.handleCreate}
              />
            </DialogContent>
          </Grid>
        </Dialog>
      </div>
    )
  }
}

const mapState = state => {
  return {
    ads: state.ads.allAds,
    allCampaigns: state.campaigns.allCampaigns,
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    createAd: newAd => dispatch(postAd(newAd)),
    fetchUserAds: userId => dispatch(fetchUserAds(userId))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AllAds))
