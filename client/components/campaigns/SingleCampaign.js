import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, GridList, GridListTile } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'
import AdsGridList from '../ads/AdsGridList'
import { fetchSingleCampaign } from '../../store'
import CampaignCard from './CampaignCard'
import history from '../../history'

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
    minWidth: 275
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

class SingleCampaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCampaign: props.selectedCampaign
    }
  }

  async componentDidMount() {
    await this.props.loadSingleCampaign()
  }

  render() {
    const { selectedCampaign, classes } = this.props
    console.log('state', this.state)
    const demographics = selectedCampaign.demographics
    const advertisements = selectedCampaign.advertisements
    console.log('selected campaign', selectedCampaign)
    console.log('demographics', selectedCampaign.demographics)
    return (
      selectedCampaign && (
        <div className={classes.root}>
          <CampaignCard
            selectedCampaign={selectedCampaign}
            demographics={demographics}
            advertisements={advertisements}
          />
        </div>
      )
    )
  }
}

const mapState = state => {
  return {
    selectedCampaign: state.campaigns.singleCampaign
  }
}

export default withStyles(styles)(connect(mapState)(SingleCampaign))
