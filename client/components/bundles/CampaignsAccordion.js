import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CampaignExpansionPanel from './CampaignExpansionPanel'

const styles = theme => ({
  details: {
    padding: '0 130px 0 130px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  divider: {
    marginTop: 10
  }
})

class CampaignsAccordion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: null
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  render() {
    const { classes, campaigns, bundle } = this.props
    const { expanded } = this.state
    console.log('campaigns', campaigns)
    let panelIndex = 1
    return (
      campaigns && (
        <Grid container direction="column" className={classes.details}>
          <Typography variant="title">{bundle.projectName}</Typography>
          {bundle.deployed && (
            <Typography variant="body1" color="primary">
              <b>Deployed</b>
            </Typography>
          )}
          <Divider className={classes.divider} />
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
                      <CampaignExpansionPanel
                        campaign={campaign}
                        bundle={bundle}
                      />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })}
          </Grid>
        </Grid>
      )
    )
  }
}

export default withStyles(styles)(CampaignsAccordion)
