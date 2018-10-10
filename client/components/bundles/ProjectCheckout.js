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
    width: '75%',
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
    const { campaigns, currentBundle, handleClick } = this.props
    console.log(currentBundle)

    return (
      <Grid container direction="column" alignContent="center">
        <Grid>
          <CampaignsAccordion campaigns={campaigns} bundle={currentBundle} />
        </Grid>
        <Grid>
          {!currentBundle.deployed ? (
            <Button type="submit" onClick={() => handleClick()}>
              Deploy project
            </Button>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapState = state => {
  return {
    currentBundle: state.bundles.bundle
  }
}

export default withStyles(styles)(connect(mapState)(ProjectCheckout))
