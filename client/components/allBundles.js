import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getAllBundles,
  setBundle,
  me,
  getCampaignsInBundle,
  removeCampaignFromBundle
} from '../store'
import NewBundle from './newBundle'
import { withStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import PropTypes from 'prop-types'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
})

class Bundles extends Component {
  state = {
    selectedIndex: 0,
    open: false
  }

  handleListItemClick = (event, index, bundle) => {
    this.setState({ selectedIndex: index })
    this.setState(state => ({ open: !state.open }))
    this.props.setBundle(bundle)
    this.props.getCampaignsInBundle(bundle.id)
  }

  removeClick = async info => {
    await this.props.removeCampaignFromBundle(info)
  }

  async componentDidMount() {
    await this.props.me()
    await this.props.getAllBundles(this.props.user.id)
    await this.props.setBundle(this.props.bundles[0])
    await this.props.getCampaignsInBundle(this.props.bundles[0].id)
  }

  render() {
    const { classes, bundles } = this.props
    const filtBuns = bundles.filter(bundle => (bundle.deployed ===false))
    let index = 0
    return filtBuns && filtBuns.length ? (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">Active Projects</ListSubheader>
          }
        >
          {filtBuns.map(bundle => {
            const indexValue = index
            index++
            return (
              <div key={bundle.id}>
                <ListItem
                  key={bundle.id}
                  button
                  selected={this.state.selectedIndex === indexValue}
                  open = {this.state.open === indexValue}
                  onClick={event =>
                    this.handleListItemClick(event, indexValue, bundle)
                  }
                  
                >
                  <ListItemText primary={bundle.projectName} />
                  {this.state.open ?  <ExpandLess /> : <ExpandMore /> }
                </ListItem>
                <Collapse in={indexValue === this.state.selectedIndex && this.state.open} timeout="auto">
                  <List component="div" key={bundle.id}>
                    {this.props.campaignsInBundle &&
                      this.props.campaignsInBundle.length > 0 ?
                      this.props.campaignsInBundle.map(campaign => {
                        return (
                          <ListItem
                            button
                            className={classes.nested}
                            key={campaign.id}
                          >
                            <ListItemText inset primary={campaign.name} />
                            <ListItemText
                              inset
                              secondary="remove"
                              onClick={() =>
                                this.removeClick({
                                  campaignId: campaign.id,
                                  bundleId: bundle.id
                                })
                              }
                            />
                          </ListItem>
                        )
                      }) : <ListItem> <ListItemText inset primary = 'No Campaigns In Project' /> </ListItem>}
                    <NavLink
                      to={{
                        pathname: '/checkout',
                        state: { bundleId: bundle.id }
                      }}
                    >
                      <ListItem className={classes.nested} button>
                        <ListItemText inset primary="See Full Details" />
                      </ListItem>
                    </NavLink>
                  </List>
                </Collapse>
              </div>
            )
          })}
          <NavLink to="/notsureyet">
            <ListItem className={classes.nested} button>
              <ListItemText inset primary="Create New Project" />
            </ListItem>
          </NavLink>
        </List>
        <NewBundle />
      </div>
      
    ) : null
  }
}

const mapState = state => {
  return {
    user: state.user.currentUser,
    bundles: state.bundles.allBundles,
    selectedBundle: state.bundles.bundle,
    campaignsInBundle: state.bundles.campaignsInBundle
  }
}

const mapDispatch = dispatch => {
  return {
    getAllBundles: userId => dispatch(getAllBundles(userId)),
    setBundle: bundle => dispatch(setBundle(bundle)),
    me: () => dispatch(me()),
    getCampaignsInBundle: bundleId =>
      dispatch(getCampaignsInBundle(bundleId)),
    removeCampaignFromBundle: info => dispatch(removeCampaignFromBundle(info))
  }
}

Bundles.propTypes = {
  classes: PropTypes.object.isRequired
}

const Bundlewrapped = withRouter(connect(mapState, mapDispatch)(Bundles))

export default withStyles(styles)(Bundlewrapped)
