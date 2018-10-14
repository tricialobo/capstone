import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  SignUp,
  UserHome,
  Home,
  AdvertiserDashboard,
  AllAds,
  BundleCheckout,
  ScriptTag,
  SingleContractPayment,
  AdvertiserChart,
  CampaignClicksChart,
  SingleCampaignProgress,
  AllCampaigns,
  AllBundles,
  AccountMenu,
  LoadingScreen,
  AdvertiserCampaigns,
  SingleCampaign,
  EditCampaign,
  PreviousProjects,
  AdForm,
  Receipt
} from './components'
import Ethereum from './components'
import {
  me,
  getPreviousProjects,
  getAllCampaigns,
  fetchAllDemographics,
  fetchUserAds,
  fetchSingleCampaign,
  fetchAllUserCampaigns
} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    console.log('CURRENT USER', this.props.currentUser)
    if (this.props.isLoggedIn && this.props.currentUser.isAdvertiser) {
      await this.props.loadAllUserCampaigns(this.props.currentUser.id)
      this.props.loadAllAds(this.props.currentUser.id)
    }
    await this.props.loadAllDemographics()
  }

  render() {
    const { isLoggedIn, currentUser } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/ethereum" component={Ethereum} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/checkout" component={BundleCheckout} />
        <Route path="/scriptTag" component={ScriptTag} />
        <Route path="/allcampaigns" component={AllCampaigns} />
        <Route path="/charts/advertiserCharts" component={AdvertiserChart} />
        <Route
          path="/charts/developer/clicksPerCampaign"
          component={CampaignClicksChart}
        />
        <Route
          path="/charts/developer/singleCampaignProgress"
          component={SingleCampaignProgress}
        />
        {/* <Route path="/allbundles" component={AllBundles} /> */}
        <Route path="/payment/:contractId" component={SingleContractPayment} />
        <Route path="/confirmpayment" component={Receipt} />
        {/* <Route exact path="/payment" component={Payment} /> */}
        <Route path="/previousprojects" component={PreviousProjects} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={Home} />
            <Route
              path="/advertiser-dashboard"
              component={AdvertiserDashboard}
            />
            <Route exact path="/ads" component={AllAds} />
            <Route path="/ads/new" component={AdForm} />
            <Route exact path="/campaigns" component={AdvertiserCampaigns} />
            <Route
              exact
              path="/campaigns/campaign/:campaignId"
              component={SingleCampaign}
            />
            <Route
              exact
              path="/campaign/campaign/:campaignId/edit"
              component={EditCampaign}
            />
            <Route path="/account" component={AccountMenu} />
          </Switch>
        )}

        {isLoggedIn && currentUser.isAdvertiser ? (
          <Switch>
            {/* ADVERTISER ROUTES */}
            <Route path="/home" component={Home} />
            <Route
              path="/advertiser-dashboard"
              component={AdvertiserDashboard}
            />
            <Route path="/account" component={AccountMenu} />
          </Switch>
        ) : (
          <Switch>
            {/* DEVELOPER ROUTES */}
            <Route path="/scriptTag" component={ScriptTag} />
            <Route path="/allcampaigns" component={AllCampaigns} />
            {/* <Route path="/allbundles" component={AllBundles} /> */}
            <Route
              path="/payment/:contractId"
              component={SingleContractPayment}
            />
            {/* <Route exact path="/payment" component={Payment} /> */}
            <Route path="/previousprojects" component={PreviousProjects} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={LoadingScreen} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.currentUser.id,
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadAllAds: userId => dispatch(fetchUserAds(userId)),
    loadAllCampaigns: dispatch(getAllCampaigns()),
    loadAllUserCampaigns: userId => dispatch(fetchAllUserCampaigns(userId)),
    loadAllDemographics: () => dispatch(fetchAllDemographics())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
