import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, GridList, GridListTile } from '@material-ui/core'
import CampaignCard from './CampaignCard'
import history from '../../history'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  }
}

class SingleCampaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCampaign: props.selectedCampaign
    }
  }

  render() {
    const { selectedCampaign, classes } = this.props
    console.log('state', this.state)
    console.log('selected campaign', selectedCampaign)
    console.log('demographics', selectedCampaign.demographics)
    return (
      selectedCampaign && (
        <div className={classes.root}>
          <CampaignCard selectedCampaign={selectedCampaign} />
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
