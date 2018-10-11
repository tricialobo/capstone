import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import CheckoutCard from './bundles/CheckoutCard'
import CampaignCard from './campaigns/CampaignCard'
import CheckoutDetails from './bundles/CheckoutDetails'
import { Grid } from '@material-ui/core'
import PaymentForm from './bundles/PaymentForm'

class SingleContractPayment extends Component {
  constructor() {
    super()
    this.state = {
      address: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    let accounts = await web3.eth.getAccounts(console.log)
    const blocks = await factory.methods.getDeployedBlocks().call()
    console.log('blocks', blocks)
    const contractHash = this.props.match.params.contractId
    const indexOf = blocks.indexOf(contractHash)
    console.log('index', indexOf)
    const currentContract = fundsTransfer(blocks[indexOf])
    console.log('currentContract', currentContract)
    currentContract.options.address = `${contractHash}`
    let address = document.getElementById('address').value
    console.log('address', address)
    const depositFunds = await currentContract.methods.deposit().send({
      gas: 6000000,
      //this needs to change to actual value... we need to talk about this value being lower!
      value: 1000000000000000000,
      from: address
    })

    const contractPaid = () =>
      axios({
        method: 'PUT',
        url: 'http://localhost:8080/api/contracts/paid',
        data: {
          contractHash: contractHash
        }
      }).then(
        this.setState({
          address: ''
        })
      )
    const sendReceipt = (name, email, mail) =>
      axios({
        method: 'POST',
        url: 'http://localhost:8080/api/send',
        data: {
          name: name,
          email: email,
          mail: mail
        }
      })

    axios
      .all([
        contractPaid(),
        sendReceipt('Tricia', 'tricia.lobo@gmail.com', {
          from: 'tricia',
          to: 'tricia.lobo@gmail.com',
          subject: 'hi tricia'
        })
      ])
      .then(
        axios.spread(function() {
          //
        })
      )
      .then(response => {
        if (response.data.msg === 'success') {
          console.log('receipt sent')
        } else if (response.data.msg === 'fail') {
          console.log('Message failed to send.')
        }
      })

      .then(
        this.props.history.push({
          pathname: '/confirmpayment'
        })
      )
  }
  render() {
    const contractHash = this.props.match.params.contractId
    console.log('temp campaign', this.props.tempCampaign)
    console.log('contractHash', contractHash)
    console.log('props', this.props)
    return (
      <PaymentForm
        campaign={this.props.tempCampaign}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        address={this.state.address}
      />
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    contract: state.contracts.currentUserContract,
    tempCampaign: state.campaigns.allCampaigns[1]
  }
}

const mapDispatch = dispatch => {
  return {
    fetchContract: userId => dispatch(fetchContract(userId))
  }
}
export default withRouter(connect(mapState)(SingleContractPayment))
