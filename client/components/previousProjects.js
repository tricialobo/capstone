import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getPreviousBundles,
  getCampaignsInBundle,
  getAllBundles
} from '../store/bundles'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ProjectsTable from './bundles/ProjectsTable'

class PreviousProjects extends Component {
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
    console.log('userid', this.props.currentUser.id)
    const prevProjects = this.props.previousBundles
    console.log('THIS.PROPS.ALLBUNS', this.props.allBundles)
    const activeProjects = this.props.allBundles.filter(
      bundle => bundle.deployed === false
    )
    return (
      <div>
        <Grid container direction="row" spacing={32}>
          <Grid item xs={6}>
            <Grid container direction="column" alignItems="center">
              <Typography variant="title">Active projects</Typography>
              {activeProjects && activeProjects.length ? (
                activeProjects.map(project => (
                  <ProjectsTable key={project.id} project={project} />
                ))
              ) : (
                <Typography variant="body1">
                  <br />
                  You currently have no active projects.
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="column" alignItems="center">
              <Typography variant="title">Completed projects</Typography>
              {prevProjects && prevProjects.length ? (
                prevProjects.map(project => (
                  <ProjectsTable key={project.id} project={project} />
                ))
              ) : (
                <Typography variant="body1">
                  <br />
                  You currently have no completed projects.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )

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
