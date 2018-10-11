import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '../../history'
import {
  withStyles,
  Typography,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Card,
  MenuItem,
  Select,
  Grid
} from '@material-ui/core'
import { postCampaign, editCampaign, removeCampaign } from '../../store'
import DemographicsList from './DemographicsList'

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
    padding: '20px',
    boxShadow: '0px'
  },
  formControl: {
    marginTop: 16
  },
  group: {
    margin: '0px',
    flexDirection: 'row'
  },
  title: {
    fontWeight: '600px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    maxWidth: 250,
    padding: 20
  }
})

class CampaignForm extends Component {
  constructor(props) {
    super()
    this.state = {
      price: 0,
      open: props.open,
      demographics: props.selectedDemographics
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { error, classes, formAction, selectedDemographics } = this.props
    return (
      <Card className={classes.card} style={{ width: '40%' }}>
        <form onSubmit={formAction}>
          <FormGroup>
            <Grid container direction="row">
              <Grid item xs={6}>
                <Grid container direction="column">
                  <FormControl className={classes.textField}>
                    <InputLabel>Campaign name</InputLabel>
                    <Input name="name" type="text" />
                  </FormControl>

                  <FormControl
                    aria-label="Campaign Price"
                    className={classes.textField}
                  >
                    <InputLabel>Price</InputLabel>
                    <Select
                      name="price"
                      value={this.state.price}
                      onChange={this.handleChange}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>Price</em>
                      </MenuItem>
                      <MenuItem value={10}>10 ETH</MenuItem>
                      <MenuItem value={20}>20 ETH</MenuItem>
                      <MenuItem value={30}>30 ETH</MenuItem>
                      <MenuItem value={40}>40 ETH</MenuItem>
                      <MenuItem value={50}>50 ETH</MenuItem>
                      <MenuItem value={60}>60 ETH</MenuItem>
                      <MenuItem value={70}>70 ETH</MenuItem>
                      <MenuItem value={80}>80 ETH</MenuItem>
                      <MenuItem value={90}>90 ETH</MenuItem>
                      <MenuItem value={100}>100 ETH</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <DemographicsList selectedDemographics={selectedDemographics} />
              </Grid>
            </Grid>
            <Button type="submit">Submit</Button>

            <Button onClick={this.props.handleClose}>Cancel</Button>

            <br />

            {error && error.response && <div> {error.response.data} </div>}
          </FormGroup>
        </form>
      </Card>
    )
  }
}

const mapState = state => {
  return {
    error: state.user.error,
    currentUser: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    createCampaign: campaign => dispatch(postCampaign(campaign)),
    editCampaign: campaignId => dispatch(editCampaign(campaignId)),
    deleteCampaign: campaignId => dispatch(removeCampaign(campaignId))
  }
}
/**
 * PROP TYPES
 */
// AdForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }

export default withStyles(styles)(connect(mapState, mapDispatch)(CampaignForm))
