import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { updateUserOnServer } from '../../store/user'
import {
  Select,
  FormControl,
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  InputLabel
} from '@material-ui/core'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  formControl: {
    minWidth: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 400
  }
})

class AccountDetails extends Component {
  constructor(props) {
    super(props)
    this.state = props.currentUser
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.state.id, this.state)
  }

  render() {
    const { classes } = this.props
    const user = this.state

    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <Grid container alignContent="center" direction="column" spacing={40}>
          <Grid>
            <TextField
              id="standard-firstName"
              label="First Name"
              name="firstName"
              className={classes.textField}
              value={user.firstName}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid>
            <TextField
              id="standard-lastName"
              label="Last Name"
              name="lastName"
              className={classes.textField}
              value={user.lastName}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid>
            <TextField
              id="standard-email"
              label="Email"
              name="email"
              className={classes.textField}
              value={user.email}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid>
            {this.props.currentUser.isAdvertiser && (
              <FormControl
                aria-label="Advertising Budget"
                className={classes.textField}
              >
                <InputLabel>Advertising Budget</InputLabel>
                <Select
                  value={this.state.budget}
                  onChange={this.handleChange}
                  displayEmpty
                  name="budget"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>Budget</em>
                  </MenuItem>
                  <MenuItem value={100}>100 ETH</MenuItem>
                  <MenuItem value={150}>150 ETH</MenuItem>
                  <MenuItem value={200}>200 ETH</MenuItem>
                  <MenuItem value={250}>250 ETH</MenuItem>
                  <MenuItem value={300}>300+ ETH</MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid>
            <TextField
              id="standard-password-input"
              label="Password"
              name="password"
              className={classes.textField}
              type="password"
              value={user.password}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid>
            <Button minWidth="100%" type="submit" className={classes.textField}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const mapState = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, updatedData) =>
      dispatch(updateUserOnServer(userId, updatedData))
  }
}

AccountDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(mapState, mapDispatch)(AccountDetails)
)
