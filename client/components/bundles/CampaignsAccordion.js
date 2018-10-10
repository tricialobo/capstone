import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CampaignExpansionPanel from './CampaignExpansionPanel'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
})

class CampaignsAccordion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      expanded: null
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = value => {
    this.setState({ value, open: false })
  }

  render() {
    const { classes } = this.props
    const { expanded } = this.state
    const campaigns = this.props.campaigns
    console.log('campaigns', campaigns)
    let panelIndex = 1
    return (
      campaigns && (
        <div className={classes.root}>
          <Grid container direction="column">
            <Grid item xs={12}>
              {campaigns &&
                campaigns.length &&
                campaigns.map(campaign => {
                  const index = panelIndex
                  panelIndex++
                  return (
                    <ExpansionPanel
                      expanded={expanded === `panel${index}`}
                      onChange={this.handleChange(`panel${index}`)}
                      key={campaign.id}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                          {campaign.name}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <CampaignExpansionPanel campaign={campaign} />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })}
            </Grid>
          </Grid>
        </div>
      )
    )
  }
}

export default withStyles(styles)(CampaignsAccordion)
