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
  Divider,
  Grid
} from '@material-ui/core'
import { postAd } from '../../store/ads'

const styles = theme => ({
  card: {
    marginTop: 20,
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
  imageContainer: {
    width: '100%',
    height: 280
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%'
  }
})

class AdForm extends Component {
  constructor(props) {
    super()
    this.state = {
      image: ''
    }
    this.handleChange = this.handleChange.bind(this)
    console.log(this.state)
  }

  handleChange = event => {
    this.setState({ image: event.target.value })
  }

  render() {
    console.log(this.props.currentUser)
    const { error, classes, formAction, handleClose } = this.props

    return (
      <Card className={classes.card} style={{ width: '40%' }}>
        <Grid container direction="column" alignItems="center">
          <Grid>
            <Typography variant="subheading">Advertisement Preview</Typography>
            <br />
            <div className={classes.imageContainer}>
              <img src={this.state.image} className={classes.image} />
            </div>
            <Divider />
          </Grid>
          <Grid>
            <form onSubmit={formAction}>
              <FormGroup style={{ marginTop: '20px' }}>
                <Grid container direction="row" spacing={40}>
                  <Grid item xs={6}>
                    <FormControl>
                      <InputLabel>Advertisement name</InputLabel>
                      <Input name="name" type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl>
                      <InputLabel>Image url</InputLabel>
                      <Input
                        name="image"
                        type="text"
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <FormControl>
                  <InputLabel>Click-through URL</InputLabel>
                  <Input name="url" type="text" />
                </FormControl>
                <br />
                <Button type="submit">Create advertisement</Button>
                <Button onClick={handleClose}>Cancel</Button>

                {error && error.response && <div> {error.response.data} </div>}
              </FormGroup>
            </form>
          </Grid>
        </Grid>
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
    createAd: newAd => dispatch(postAd(newAd))
  }
}
/**
 * PROP TYPES
 */
// AdForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }

export default withStyles(styles)(connect(mapState, mapDispatch)(AdForm))
