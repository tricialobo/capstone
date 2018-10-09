//the view for devs - previous projects
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPreviousBundles, getCampaignsInBundle } from '../store/bundles'
import { Link } from 'react-router-dom'

class PreviousProjects extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    await this.props.getPreviousBundles(this.props.currentUser.id)
    const bundles = this.props.previousBundles.data
    const campaigns = bundles.map(bundle =>
      this.props.getCampaignsInBundle(bundle.id)
    )

    console.log('campaigns', campaigns)
  }
  render() {
    console.log('props', this.props)
    //const campaigns = this.props.getCampaignsInBundle(bundle.id)
    const bundles = this.props.previousBundles.data

    const bundlesMap = bundles.map(bundle => (
      <ul>
        <li>{bundle.projectName} </li>
        <li>
          {this.props.campaignsInBundle.map(campaign => (
            <ul>
              <li>{campaign.name}</li>
              <li>{campaign.price}</li>
            </ul>
          ))}
        </li>
      </ul>
    ))
    return bundles.length ? bundlesMap : <h3>No Previous Projects</h3>
  }
}

const mapState = state => {
  return {
    previousBundles: state.bundles.previousBundles,
    campaignsInBundle: state.bundles.campaignsInBundle,
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    getPreviousBundles: currentUserId =>
      dispatch(getPreviousBundles(currentUserId)),
    getCampaignsInBundle: bundleId => dispatch(getCampaignsInBundle(bundleId))
  }
}

export default connect(mapState, mapDispatch)(PreviousProjects)
