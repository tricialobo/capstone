import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Menu,
  MenuItem
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircleOutlined'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    boxShadow: 'none',
    marginBottom: 30
  },
  grow: {
    flexGrow: 1
  },
  buttonBorder: {
    border: 'none'
  },
  navLinks: {
    fontWeight: 'bold',
    fontSize: '1rem',
    textTransform: 'none'
  }
})

class Navbar extends Component {
  state = {
    anchorEl: null
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Typography variant="display1" color="inherit">
            <Link to="/home">
              <img src="/images/logo-4.png" width={55} />
            </Link>
          </Typography>
          {this.props.isLoggedIn ? (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {/* The navbar will show these links after you log in */}
              {this.props.isAdvertiser ? (
                <div>
                  <Button className="hvr-underline-from-center" color="inherit">
                    <Link className={classes.navLinks} to="/campaigns">
                      Campaigns
                    </Link>
                  </Button>
                  <Button className="hvr-underline-from-center" color="inherit">
                    <Link className={classes.navLinks} to="/ads">
                      Advertisements
                    </Link>
                  </Button>
                </div>
              ) : (
                <div>
                  <Button className="hvr-underline-from-center" color="inherit">
                    <Link className={classes.navLinks} to="/allcampaigns">
                      Campaigns
                    </Link>
                  </Button>
                  <Button className="hvr-underline-from-center" color="inherit">
                    <Link className={classes.navLinks} to="/previousprojects">
                      Projects
                    </Link>
                  </Button>
                </div>
              )}
              <Button
                className={classes.buttonBorder}
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleMenuClick}
              >
                <AccountCircle />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                className={classes.navLinks}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link to="/account">Account</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                </MenuItem>
              </Menu>
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {/* The navbar will show these links before you log in */}
              <Button className="hvr-underline-from-center" color="inherit">
                <Link className={classes.navLinks} to="/about">
                  About
                </Link>
              </Button>
              <Button className="hvr-underline-from-center" color="inherit">
                <Link className={classes.navLinks} to="/signup">
                  Sign Up
                </Link>
              </Button>
              <Button className="hvr-underline-from-center" color="inherit">
                <Link className={classes.navLinks} to="/login">
                  Login
                </Link>
              </Button>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.currentUser.id,
    currentUser: state.user.currentUser,
    isAdvertiser: state.user.currentUser.isAdvertiser
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
