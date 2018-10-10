import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  ExpansionPanelDetails,
  ExpansionPanelActions,
  ExpansionPanelSummary,
  Button,
  Divider,
  Grid
} from '@material-ui/core'
import CheckoutCard from './CheckoutCard'
import { removeCampaignFromBundle } from '../../store'

const styles = theme => ({
  root: {
    width: '100%'
  },
  details: {
    alignItems: 'center'
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

class CampaignExpansionPanel extends Component {
  handleRemove = async info => {
    await this.props.removeCampaign(info)
  }

  render() {
    const { classes, campaign, bundle } = this.props

    return (
      <Grid container justify="center" className={classes.root}>
        <ExpansionPanelDetails className={classes.details}>
          <CheckoutCard campaign={campaign} />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button
            size="small"
            onClick={() =>
              this.handleRemove({
                campaignId: campaign.id,
                bundleId: bundle.id
              })
            }
          >
            Remove
          </Button>
        </ExpansionPanelActions>
        <Divider />
      </Grid>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    removeCampaign: info => dispatch(removeCampaignFromBundle(info))
  }
}

export default withStyles(styles)(
  connect(null, mapDispatch)(CampaignExpansionPanel)
)
