import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import { fetchSingleCampaign } from '../../store'

const styles = theme => ({
  root: {
    marginTop: 9,
    borders: 'none',
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  }
})

class CampaignsList extends Component {
  render() {
    const {
      classes,
      campaigns,
      selectedIndex,
      handleListItemClick
    } = this.props
    let panelIndex = 0

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Campaigns</ListSubheader>}
        >
          {campaigns &&
            campaigns.length &&
            campaigns.map(campaign => {
              const index = panelIndex
              panelIndex++
              return (
                <ListItem
                  key={campaign.id}
                  button
                  selected={selectedIndex === index}
                  onClick={event => handleListItemClick(event, index, campaign)}
                >
                  <ListItemText primary={campaign.name} />
                </ListItem>
              )
            })}
          <ListItem button onClick={this.props.handleOpen}>
            <ListItemText primary="Create a campaign" />
          </ListItem>
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(CampaignsList)
