import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signUpUser } from '../store/user'
import history from '../history'
import {
  withStyles,
  FormLabel,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  Card,
  Radio,
  RadioGroup,
  MenuItem,
  FormHelperText,
  Divider,
  Select,
  Grid
} from '@material-ui/core'

const styles = theme => ({
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
    marginTop: 16,
    width: '90%'
  },
  group: {
    margin: '0px',
    flexDirection: 'row'
  },
  title: {
    fontWeight: '600px',
    paddingBottom: '10px'
  },
  addressField: {
    width: '100%'
  }
})

class SignUpForm extends Component {
  state = {
    userType: 'advertiser',
    budget: 0
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { handleSubmit, error, classes } = this.props

    return (
      <Card className={classes.card} style={{ width: '40%' }}>
        <div className={classes.formHeader}>
          <Typography className={classes.title} variant="title" color="inherit">
            Hello there!
          </Typography>
          <Typography variant="body1" color="inherit">
            Sign up with us to get access to high quality ads and advertisers
            who are relevant to your users.
          </Typography>
          <br />
          <Divider />
        </div>
        <form onSubmit={handleSubmit}>
          <FormGroup style={{ marginTop: '30px' }}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <Typography variant="subheading">I am a(n):</Typography>
                  <RadioGroup
                    aria-label="I am a(n):"
                    name="userType"
                    className={classes.group}
                    value={this.state.userType}
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
              </Grid>
              <Grid item xs={6}>
                {this.state.userType === 'advertiser' ? (
                  <FormControl
                    aria-label="My budget is"
                    className={classes.formControl}
                  >
                    <Typography variant="subheading">
                      My advertising budget is:{' '}
                    </Typography>
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
                ) : (
                  <FormControl className={classes.addressField}>
                    <Typography variant="subheading">
                      My ethereum wallet address is:
                    </Typography>
                    <Input name="address" type="text" />
                  </FormControl>
                )}
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={8}>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>First Name</InputLabel>
                  <Input name="firstName" type="text" />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>Last Name</InputLabel>
                  <Input name="lastName" type="text" />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>Email</InputLabel>
                  <Input name="email" type="text" />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                {' '}
                <FormControl>
                  <InputLabel>Password</InputLabel>
                  <Input name="password" type="password" />
                </FormControl>
              </Grid>
            </Grid>

            <br />
            <Button type="submit">Sign up</Button>
            <Button component="a" href="/auth/google">
              Sign up with Google
            </Button>
            {error && error.response && <div> {error.response.data} </div>}
          </FormGroup>
        </form>
      </Card>
    )
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const isAdvertiser = evt.target.userType.value === 'advertiser'
      const webdevBlockAddress = evt.target.address.value
      const budget = evt.target.budget ? evt.target.budget.value : 0
      const balance = budget
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        isAdvertiser: isAdvertiser,
        webdevBlockAddress: webdevBlockAddress,
        budget: budget,
        balance: balance
      }
      dispatch(signUpUser(newUser))
      history.push('/home')
    }
  }
}

const SignUp = withStyles(styles)(connect(mapSignup, mapDispatch)(SignUpForm))

export default SignUp

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
