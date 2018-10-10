import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  GridList,
  GridListTile,
  Card,
  CardContent,
  CardHeader,
  Button,
  Divider
} from '@material-ui/core'
import CampaignsAccordion from './CampaignsAccordion'
import classnames from 'classnames'
import campaigns from '../../store/campaigns'

const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  card: {
    minWidth: '100%'
  },
  details: {
    minWidth: '100%'
  },
  content: {
    paddingTop: 45
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  button: {
    justifyContent: 'start'
  }
}

class ProjectCheckout extends Component {
  render() {
    const { classes, campaigns } = this.props
    return (
      <div>
        <Grid container justify="center">
          <CampaignsAccordion campaigns={campaigns} />
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(ProjectCheckout)
