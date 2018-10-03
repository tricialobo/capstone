import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logInUser } from '../store/user'
import { withStyles, FormLabel } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Card from '@material-ui/core/Card'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    boxShadow: 'none',
    marginBottom: 60
  },
  grow: {
    flexGrow: 1
  },
  card: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    /* bring your own prefixes */
    transform: 'translate(-50%, -50%)',
    border: '2px #000000 solid',
    borderRadius: '0px',
    padding: '30px',
    boxShadow: '0px'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: 'row'
  }
})

/**
 * COMPONENT
 */
class AuthForm extends Component {
  state = {
    value: 'advertiser'
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  render() {
    const { handleSubmit, error, classes } = this.props

    return (
      <Card className={classes.card} style={{ width: '40%' }}>
        <form onSubmit={handleSubmit}>
          <FormGroup style={{ margin: '1em' }}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">I am a(n):</FormLabel>
              <RadioGroup
                aria-label="I am a(n):"
                name="userType"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="advertiser"
                  control={<Radio />}
                  label="advertiser"
                />
                <FormControlLabel
                  value="developer"
                  control={<Radio />}
                  label="developer"
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <InputLabel>Email</InputLabel>
              <Input name="email" type="text" />
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input name="password" type="password" />
            </FormControl>
            <br />
            <Button type="submit" onSubmit={handleSubmit}>
              LOGIN
            </Button>
            <Button component="a" href="/auth/google">
              Login with Google
            </Button>
            {error && error.response && <div> {error.response.data} </div>}
          </FormGroup>
        </form>
      </Card>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const userType = evt.target.userType.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(logInUser(email, password, userType))
    }
  }
}

export const Login = withStyles(styles)(
  connect(mapLogin, mapDispatch)(AuthForm)
)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
