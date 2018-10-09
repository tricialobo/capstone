import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core'
import CampaignForm from './CreateCampaignForm'
import { postCampaign } from '../../store/campaigns'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    width: '700px'
  },
  dialogButtons: {
    justifyContent: 'center'
  }
})

class CreateCampaignDialog extends React.Component {
  constructor(props) {
    super(props)
    let demographicsArray = []
    for (let i = 0; i < props.demographics.length; i++) {
      demographicsArray.push({
        id: props.demographics[i].id,
        name: props.demographics[i].name,
        checked: false
      })
    }
    console.log('checked demographics', demographicsArray)
    this.state = {
      demographics: demographicsArray,
      name: '',
      price: 0,
      value: props.value
    }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value })
    }
  }

  handleCancel = () => {
    this.props.onClose(this.props.value)
  }

  handleOk = () => {
    console.log('NEW CAMPAIGN STATE', this.state)
    this.props.createNewCampaign({
      advertiserId: this.props.currentUser.id,
      name: this.state.name,
      price: this.state.price,
      demographics: this.state.demographics
    })
    this.props.onClose(this.state.value)
  }

  handleChange = (event, value) => {
    this.setState({ value })
    console.log(this.state)
  }

  render() {
    const { value, classes, ...other } = this.props
    const { demographics, price, name } = this.state
    return (
      <Dialog
        disableEscapeKeyDown
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">New Campaign</DialogTitle>
        <Grid container direction="column">
          <Grid item xs={12}>
            <DialogContent>
              <CampaignForm
                demographics={demographics}
                price={price}
                name={name}
                onSubmit={this.handleOk}
              />
            </DialogContent>
          </Grid>
          <Grid item xs={12}>
            <DialogActions className={classes.dialogButtons}>
              <Button onClick={this.handleCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleOk} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    )
  }
}

const mapState = state => {
  return {
    demographics: state.demographics.allDemographics,
    currentUser: state.user.currentUser
  }
}

// CreateCampaignDialog.propTypes = {
//   onClose: PropTypes.func,
//   value: PropTypes.string
// }

export default withStyles(styles)(connect(mapState)(CreateCampaignDialog))
