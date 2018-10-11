//the view for devs - previous projects
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPreviousBundles, getCampaignsInBundle, getAllBundles } from '../store/bundles'
import { Link } from 'react-router-dom'

class PreviousProjects extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    await this.props.getPreviousBundles(this.props.currentUser.id)
    await this.props.getAllBundles(this.props.userId)
    //await this.props.getCampaignsInBundle()
    //const bundles = this.props.previousBundles.data
    // const campaigns = bundles.map(bundle =>
    //   this.props.getCampaignsInBundle(bundle.id)

    //console.log('campaigns', campaigns)
  }

  render() {
    const bundles = this.props.previousBundles.data
    console.log('THIS.PROPS.ALLBUNS', this.props.allBundles)
    const filtBuns = this.props.allBundles.filter(bundle => bundle.deployed === false)
    return bundles && this.props.allBundles ? (
      <div>
        <h1>All Projects</h1>
        <h2>Active Projects</h2>
        {filtBuns.map(bun => {
          return (
            <ul key = {bun.id}>
              <li>{bun.projectName} </li>
              <li>
                {bun.campaigns.map(campaign => (
                  <ul key = {campaign.id}>
                    <li>{campaign.name}</li>
                    <li>{campaign.price}</li>
                  </ul>
                ))}
              </li>
              </ul>
          )
        })}
        <h2>Previous Projects</h2>
      {bundles.map(bundle => {
        return (
            <ul key = {bundle.id}>
              <li>{bundle.projectName} </li>
              <li>
                {bundle.campaigns.map(campaign => (
                  <ul key = {campaign.id}>
                    <li>{campaign.name}</li>
                    <li>{campaign.price}</li>
                  </ul>
                ))}
              </li>
              <li>{bundle.scriptTag}</li>
        </ul>)}
          )}
    </div>) : null
  //   console.log('props', this.props)
  //   //const campaigns = this.props.getCampaignsInBundle(bundle.id)
  //   if (this.props.previousBundles && this.props.allBundles) {
  //   const bundles = this.props.previousBundles.data

  //   const bundlesMap = bundles.map(bundle => (
  //     <ul>
  //       <li>{bundle.projectName} </li>
  //       <li>
  //         {bundle.campaigns.map(campaign => (
  //           <ul key = {campaign.id}>
  //             <li>{campaign.name}</li>
  //             <li>{campaign.price}</li>
  //           </ul>
  //         ))}
  //       </li>
  //       <li>{bundle.scriptTag}</li>
  //     </ul>
  //   ))

  //   const filtBuns = this.props.allBundles.filter(bundle => bundle.deployed === false)
  //   return bundles.length ? 
  //     bundlesMap : <h3>No Previous Projects</h3>
  // } else return null
   } 
}

const mapState = state => {
  return {
    previousBundles: state.bundles.previousBundles,
    campaignsInBundle: state.bundles.campaignsInBundle,
    currentUser: state.user.currentUser,
    allBundles: state.bundles.allBundles,
    userId: state.user.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    getPreviousBundles: currentUserId =>
      dispatch(getPreviousBundles(currentUserId)),
    getCampaignsInBundle: bundleId => dispatch(getCampaignsInBundle(bundleId)),
    getAllBundles: userId => dispatch(getAllBundles(userId))
  }
}

export default connect(mapState, mapDispatch)(PreviousProjects)
