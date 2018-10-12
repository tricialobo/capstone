import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  GridListTile,
  GridListTileBar,
  IconButton,
  GridList,
  Grid,
  Typography
} from '@material-ui/core/'
import { connect } from 'react-redux'
import fetchUserAds from '../store'

class Home extends Component {
  componentDidMount() {
    fetchUserAds(this.props.currentUser.id)
  }
  render() {
    console.log('I"m home')
    return <h1>hi!</h1>
  }
}

const mapState = state => ({
  currentUser: state.user.currentUser
})

const mapDispatch = dispatch => ({
  fetchUserAds: userId => dispatch(fetchUserAds(userId))
})

export default Home
