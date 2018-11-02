import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button, Divider } from '@material-ui/core'
import CampaignsAccordion from './CampaignsAccordion'

class ProjectCheckout extends Component {
  render() {
    const { campaigns, currentBundle, handleClick } = this.props
    console.log('PROPS IN PROJ CHECL', this.props)

    return (
      <Grid container direction="column" alignItems="center">
        <Grid>
          <CampaignsAccordion campaigns={campaigns} bundle={currentBundle} />
        </Grid>
        <Grid>
          {!currentBundle.deployed && (
            <Button type="submit" onClick={handleClick}>
              Deploy project
            </Button>
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapState = state => {
  return {
    currentBundle: state.bundles.bundle
  }
}

export default connect(mapState)(ProjectCheckout)
