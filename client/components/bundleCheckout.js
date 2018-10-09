import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
import axios from 'axios'
import {
  getCampaignsInBundle,
  getAdvertisements,
  getAdScript
} from '../store/bundles'
class BundleCheckout extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    //this.sendEmail = this.sendEmail.bind(this)
    this.state = {}
  }
  async componentDidMount() {
    // // await this.props.getCampaigns(1)
    // await this.props.getAdvertisements(1)
    // await this.props.getCampaignsInBundle(1)

    await this.props.getAdvertisements(this.props.bundleId)
    await this.props.getCampaignsInBundle(this.props.bundleId)
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
        alert('Message Sent')
      } else if (response.data.msg === 'fail') {
        console.log('email response', response)
        alert('Message failed to send.')
      }
    })
  }
  async handleSubmit() {
    let accounts = await web3.eth.getAccounts(console.log)
    let campaigns = this.props.campaigns
    console.log('accounts', accounts)
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
      const block = blocks[blocks.length - 1]
      console.log('block', block)

      const createContract = () => {
        axios({
          method: 'POST',
          url: 'http://localhost:8080/api/contracts',
          data: {
            campaignId: campaign.id,
            bundleId: 1,
            contractHash: blocks[blocks.length - 1],
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
              from: campaign.advertiser.firstName,
              to: campaign.advertiser.email,
              subject: 'Please deposit payment for new contract',
              text: `Please sign in at http://localhost:8080/payment to complete payment`
            }

            // blocks[blocks.length - 1]
          )
        ])
        .then(
          axios.spread(function(contract, email) {
            //
          })
        )
        .then(() =>
          this.props.history.push({
            pathname: '/scriptTag',
            bundleId: 1
          })
        )
    })
  }

  render() {
    //const campaigns = this.state.campaigns
    console.log('state', this.state)
    const props = this.props
    console.log('props', props)
    const campaigns = this.props.campaigns
    return (
      <div>
        <h1>{this.props.bundle.projectName} Detail</h1>
        {campaigns && campaigns.length ? (
          <div>
            <h2>Campaigns In Project</h2>
            <ul>
              {campaigns.map(campaign => {
                return <li key={campaign.id}>{campaign.name}</li>
              })}
            </ul>
            <button type="submit" onClick={() => this.handleSubmit()}>
              Deploy Bundle
            </button>
          </div>
        ) : (
          <h2>No Campaigns In Your Bundle</h2>
        )}
      </div>
    )
  }
}

const mapState = state => {
  console.log('state', state)
  return {
    campaigns: state.bundles.campaignsInBundle,

    devId: state.user.currentUser.id,

    bundleId: state.bundles.bundle.id,

    bundle: state.bundles.bundle
  }
}

const mapDispatch = dispatch => {
  return {
    // getCampaigns: bundleId => dispatch(getCampaigns(bundleId)),
    getAdvertisements: id => dispatch(getAdvertisements(id)),
    getAdScript: id => dispatch(getAdScript(id)),
    getCampaignsInBundle: bundleId => dispatch(getCampaignsInBundle(bundleId))
  }
}
export default connect(mapState, mapDispatch)(BundleCheckout)
