import React, { Component } from 'react'
import { connect } from 'react-redux'
import factory from '../../ethereum/factory'
import fundsTransfer from '../../ethereum/fundsTransfer'
import web3 from '../../ethereum/web3'
import { fetchContract } from '../store/contracts'
import { Link } from 'react-router-dom'
class Payment extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     address: ''
  //   }
  //   this.handleSubmit = this.handleSubmit.bind(this)
  //   this.handleChange = this.handleChange.bind(this)
  // }

  // handleChange(evt) {
  //   this.setState({
  //     [evt.target.name]: evt.target.value
  //   })
  // }
  // async handleSubmit(evt) {
  //   evt.preventDefault()
  //   let accounts = await web3.eth.getAccounts(console.log)
  //   const blocks = await factory.methods.getDeployedBlocks().call()
  //   console.log('blocks', blocks)
  //   await this.props.fetchContract(this.props.user.currentUser.id)
  //   const contractHash = this.props.contract[this.props.contract.length - 1]
  //     .contract.contractHash

  //   const thecurr = blocks.indexOf(contractHash)
  //   console.log('index', thecurr)
  //   const contractthecurr = fundsTransfer(blocks[thecurr])
  //   console.log('contractthecurr', contractthecurr)
  //   contractthecurr.options.address = `${contractHash}`
  //   let address = document.getElementById('address').value
  //   console.log('address', address)
  //   const depositFunds = await contractthecurr.methods.deposit().send({
  //     gas: 6000000,
  //     value: 1000000000000000000,
  //     from: address
  //   })

  // }

  async componentDidMount() {
    //gets all of user's open contracts
    await this.props.fetchContract(this.props.user.currentUser.id)
  }

  render() {
    console.log('contract', this.props.contract)
    let contractMap = this.props.contract.map(elem => (
      <Link to={`/payment/${elem.contract.contractHash}`} key={elem.contractId}>
        Contract ID: {elem.contract.contractHash} Balance Owed:{' '}
        {elem.contract.balance} ETH
      </Link>
    ))
    return (
      <div>
        <h3> Open Contracts </h3>
        {contractMap}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    contract: state.contracts.currentUserContract
  }
}

const mapDispatch = dispatch => {
  return {
    fetchContract: userId => dispatch(fetchContract(userId))
  }
}
export default connect(mapState, mapDispatch)(Payment)
