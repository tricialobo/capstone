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

class Home extends Component {
  render() {
    console.log('I"m home')
    return <h1>hi!</h1>
  }
}

export default Home
