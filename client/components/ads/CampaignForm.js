import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '../../history'
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
  Select,
  Grid
} from '@material-ui/core'
import { postAd } from '../../store/ads'

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
    marginTop: 16
  },
  group: {
    margin: '0px',
    flexDirection: 'row'
  },
  title: {
    fontWeight: '600px',
    paddingBottom: '10px'
  }
})

class CampaignForm extends Component {
  constructor(props) {
    super()
    this.state = props.currentUser
    console.log(this.state)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log(this.props.currentUser)
    const { error, classes } = this.props

    return (
      <Card className={classes.card} style={{ width: '40%' }}>
        <div className={classes.formHeader}>
          <Typography className={classes.title} variant="title" color="inherit">
            New advertisement
          </Typography>
        </div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup style={{ marginTop: '30px' }}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>Advertisement name</InputLabel>
                  <Input name="name" type="text" />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>Image url</InputLabel>
                  <Input name="image" type="text" />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl>
              <InputLabel>Click-through URL</InputLabel>
              <Input name="url" type="text" />
            </FormControl>
            <br />
            <Button type="submit">Create advertisement</Button>
            {error && error.response && <div> {error.response.data} </div>}
          </FormGroup>
        </form>
      </Card>
    )
  }
}

const mapState = state => {
  return {
    error: state.user.error
  }
}
/**
 * PROP TYPES
 */
// AdForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }

export default withStyles(styles)(CampaignForm)
