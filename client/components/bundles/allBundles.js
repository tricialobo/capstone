import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getAllBundles,
  setBundle,
  me,
  getCampaignsInBundle,
  removeCampaignFromBundle,
  addNew
} from '../../store'
import NewBundle from './newBundle'
import { withStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider
} from '@material-ui/core'
import PropTypes from 'prop-types'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

const styles = theme => ({
  root: {
    marginTop: 8,
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
    console.log('hello?')
    await this.props.removeCampaignFromBundle(info)
  }

  newBunClick = async () => {
    await this.props.addNew()
  }

  async componentDidMount() {
    await this.props.me()
    //await this.props.getAllBundles(this.props.user.id)
    //await this.props.setBundle(this.props.bundles[0])
    await this.props.getCampaignsInBundle(this.props.bundles[0].id)
  }

  render() {
    const { classes, bundles } = this.props
    const filtBuns = bundles.filter(bundle => bundle.deployed === false)
    let index = 0
    return bundles ? (
      <div className={classes.root}>
        <List
          className={classes.list}
          component="nav"
          subheader={
            <ListSubheader component="div">Active Projects</ListSubheader>
          }
        >
          <Divider />
          {filtBuns.length ? (
            filtBuns.map(bundle => {
              const indexValue = index
              index++
              return (
                <div key={bundle.id}>
                  <ListItem
                    key={bundle.id}
                    button
                    selected={this.state.selectedIndex === indexValue}
                    open={this.state.open === indexValue}
                    onClick={event =>
                      this.handleListItemClick(event, indexValue, bundle)
                    }
                  >
                    <ListItemText primary={bundle.projectName} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    in={
                      indexValue === this.state.selectedIndex && this.state.open
                    }
                    timeout="auto"
                  >
                    <List component="div" key={bundle.id}>
                      {this.props.campaignsInBundle &&
                      this.props.campaignsInBundle.length > 0 ? (
                        this.props.campaignsInBundle.map(campaign => {
                          return (
                            <ListItem
                              button
                              className={classes.nested}
                              key={campaign.id}
                            >
                              <ListItemText primary={campaign.name} />
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
                        })
                      ) : (
                        <ListItem>
                          <ListItemText primary="No Campaigns In Project" />{' '}
                        </ListItem>
                      )}
                      <NavLink
                        to={{
                          pathname: '/checkout',
                          state: { bundleId: bundle.id }
                        }}
                      >
                        <ListItem className={classes.nested} button>
                          <ListItemText primary="See Full Details">
                            <Divider />
                          </ListItemText>
                        </ListItem>
                      </NavLink>
                    </List>
                  </Collapse>
                </div>
              )
            })
          ) : (
            <h5>No Active Projects</h5>
          )}
          <ListItem
            className={classes.nested}
            button
            onClick={() => this.newBunClick()}
          >
            <ListItemText inset primary="Create New Project" />
          </ListItem>
        </List>
        {this.props.addNewBool ? <NewBundle /> : null}
      </div>
    ) : null
  }
}

const mapState = state => {
  return {
    user: state.user.currentUser,
    bundles: state.bundles.allBundles,
    selectedBundle: state.bundles.bundle,
    campaignsInBundle: state.bundles.campaignsInBundle,
    addNewBool: state.bundles.addNewBool
  }
}

const mapDispatch = dispatch => {
  return {
    getAllBundles: userId => dispatch(getAllBundles(userId)),
    setBundle: bundle => dispatch(setBundle(bundle)),
    me: () => dispatch(me()),
    getCampaignsInBundle: bundleId => dispatch(getCampaignsInBundle(bundleId)),
    removeCampaignFromBundle: info => dispatch(removeCampaignFromBundle(info)),
    addNew: () => dispatch(addNew())
  }
}

Bundles.propTypes = {
  classes: PropTypes.object.isRequired
}

const Bundlewrapped = withRouter(connect(mapState, mapDispatch)(Bundles))

export default withStyles(styles)(Bundlewrapped)
