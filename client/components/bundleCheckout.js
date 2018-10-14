import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import {
  getCampaignsInBundle,
  getAdvertisements,
  getAdScript,
  updateBundle
} from '../store/bundles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import ProjectCheckout from './bundles/ProjectCheckout'
import CheckoutEmail from './bundles/CheckoutEmail'
import ScriptTag from './scriptTag'

class BundleCheckout extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    //this.sendEmail = this.sendEmail.bind(this)
    this.state = {
      showScriptTag: false
    }
  }
  async componentDidMount() {
    // // await this.props.getCampaigns(1)
    // await this.props.getAdvertisements(1)
    // await this.props.getCampaignsInBundle(1)

    await this.props.getAdvertisements(this.props.bundle.id)
    await this.props.getCampaignsInBundle(this.props.bundle.id)

    //this.handleSubmit = this.handleSubmit.bind(this)
  }
  sendEmail = (name, email, mail) => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/send',
      data: {
        name: name,
        email: email,
        mail: mail
      }
    }).then(response => {
      if (response.data.msg === 'success') {
        console.log('success!!!!!!')
      } else if (response.data.msg === 'fail') {
        console.log('Message failed to send.')
      }
    })
  }
  async handleClick() {
    console.log('hello, before accounts')
    let accounts = await web3.eth.getAccounts(console.log)
    console.log('hello, after accounts')
    let campaigns = this.props.campaigns
    console.log('campaigns', campaigns)

    campaigns.forEach(async campaign => {
      const newBlock = await factory.methods.createBlock().send({
        // const newBlock = await factory.methods.createBlock(campaign.price).send({
        gas: 3000000,
        from: accounts[0]
      })
      const newContract = fundsTransfer(newBlock)
      console.log('new contract', newContract)
      const blocks = await factory.methods.getDeployedBlocks().call()
      console.log('blocks', blocks)
      const contractHash = blocks[blocks.length - 1]

      const createContract = () => {
        axios({
          method: 'POST',
          url: 'http://localhost:8080/api/contracts',
          data: {
            campaignId: campaign.id,
            bundleId: this.props.bundle.id,
            contractHash: contractHash,
            balance: campaign.price,
            advertiserId: campaign.advertiser.id,
            devId: this.props.devId
          }
        }).then(response => {
          console.log('response', response)
        })
      }

      axios
        .all([
          createContract(),
          this.sendEmail(
            campaign.advertiser.firstName,

            campaign.advertiser.email,
            {
              forceEmbeddedImages: true,
              from: campaign.advertiser.firstName,
              //to: campaign.advertiser.email,
              to: 'tricia.lobo@gmail.com',
              subject: 'Grace - please deposit payment for new contract',
              //text: `Please sign in at http://localhost:8080/payment/${contractHash} to complete payment`,
              html: CheckoutEmail(contractHash)
            }
          )
        ])
        .then(
          axios.spread(function(contract, email) {
            //
          })
        )
        .then(
          () =>
            // this.props.history.push({
            //   pathname: '/scriptTag',
            //   bundleId: 1
            // })
            // this.props.updateBundle(this.props.bundleId)
            this.props.bundle && this.props.updateBundle(this.props.bundle.id)
        )
    })
    this.setState({ showScriptTag: true })
  }

  render() {
    console.log('bundle', this.props.bundle)
    console.log('bundleid', this.props.bundleId)
    //const campaigns = this.state.campaigns
    console.log('state', this.state)
    const props = this.props
    console.log('props', props)
    const { campaigns, bundle, classes } = this.props
    return (
      <Grid container alignItems="center">
        {campaigns && campaigns.length ? (
          <Grid>
            <ProjectCheckout
              bundle={bundle}
              campaigns={campaigns}
              handleClick={this.handleClick}
            />
            {bundle.scriptTag && (
              <div className={classes.scriptTag}>
                <Divider /> <br />
                <br />
                <ScriptTag bundleId={bundle.id} />
              </div>
            )}
          </Grid>
        ) : (
          <h2>No Campaigns In Your Bundle</h2>
        )}
      </Grid>
    )
  }
}

const mapState = state => {
  console.log('state', state)
  return {
    campaigns: state.bundles.campaignsInBundle,

    devId: state.user.currentUser.id,

    // bundleId: state.bundles.bundle.id,

    bundle: state.bundles.bundle
  }
}

const styles = {
  contain: {
    width: '75%',
    flexGrow: 1
  },
  divider: {
    marginTop: 10
  },
  scriptTag: {
    textAlign: 'center'
  }
}

const mapDispatch = dispatch => {
  return {
    // getCampaigns: bundleId => dispatch(getCampaigns(bundleId)),
    getAdvertisements: id => dispatch(getAdvertisements(id)),
    getAdScript: id => dispatch(getAdScript(id)),
    getCampaignsInBundle: bundleId => dispatch(getCampaignsInBundle(bundleId)),
    updateBundle: bundleId => dispatch(updateBundle(bundleId))
  }
}
export default withStyles(styles)(
  connect(mapState, mapDispatch)(BundleCheckout)
)
