import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter as Router, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import AccountDetails from './AccountDetails'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = theme => ({
  root: {
    marginTop: '30px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    width: 500,
    border: '2px #000000 solid'
  },
  appBar: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center'
  }
})

class AccountMenu extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <Grid container justify="center">
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Account" />
              <Tab label="Billing" />
              <Tab label="Settings" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <AccountDetails />
            </TabContainer>
          )}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
        </div>
      </Grid>
    )
  }
}

AccountMenu.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AccountMenu)
