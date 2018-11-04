import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getPreviousBundles,
  getCampaignsInBundle,
  getAllBundles
} from '../../store/bundles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ProjectsTable from './ProjectsTable'

class PreviousProjects extends Component {
  async componentDidMount() {
    await this.props.getPreviousBundles(this.props.currentUser.id)
    await this.props.getAllBundles(this.props.userId)
  }

  render() {
    const prevProjects = this.props.previousBundles
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
