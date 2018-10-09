import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { updateUserOnServer } from '../../store/user'
import {
  Select,
  FormControl,
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem
} from '@material-ui/core'
import DemographicsList from './DemographicsList'
import { postCampaign } from '../../store'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: 600
  }
})

class CreateCampaignForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advertiserId: props.currentUser.id,
      name: props.name,
      price: props.price,
      demographics: props.demographics
    }
    console.log(this.state)
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
    this.props.createCampaign(this.state)

    console.log(this.state)
  }

  render() {
    const { classes, allDemographics } = this.props
    const campaign = this.state
    const demographics = this.state.demographics
    console.log(demographics)

    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <Grid container direction="row" justify="center" spacing={40}>
          <Grid item xs={4} className={classes.accountDetails}>
            <Typography className={classes.formTitle} variant="title">
              Details
            </Typography>
            <TextField
              id="standard-name"
              label="Campaign Name"
              name="name"
              className={classes.textField}
              value={campaign.name}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Price"
              name="price"
              className={classes.textField}
              value={campaign.price}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.formTitle} variant="title">
              Demographics
            </Typography>
            <DemographicsList demographics={demographics} />
          </Grid>
        </Grid>
      </form>
    )
  }
}
const mapState = state => {
  return {
    allDemographics: state.demographics.allDemographics,
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    createCampaign: campaign => dispatch(postCampaign(campaign))
  }
}

CreateCampaignForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(mapState, mapDispatch)(CreateCampaignForm)
)
