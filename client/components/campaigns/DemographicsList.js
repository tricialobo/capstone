import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
})

class DemographicsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      demographics: props.selectedDemographics,
      selected: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = name => event => {
    const options = this.state.demographics
    for (let i = 0; i < options.length; i++) {
      if (options[i].name === event.target.value) {
        options[i].checked = !options[i].checked
      }
    }
    this.setState({ demographics: options })
    console.log('demo list', this.state.demographics)
  }

  render() {
    const { classes } = this.props
    const demographics = this.state.demographics
    const error = Object.values(this.state).filter(v => v).length !== 2

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Target Demographics</FormLabel>
          <FormGroup>
            {demographics.map(demographic => (
              <FormControlLabel
                control={
                  <Checkbox
                    key={demographic.name}
                    checked={demographic.checked}
                    onChange={this.handleChange(demographic.name)}
                    value={demographic.name}
                  />
                }
                key={demographic.id}
                label={demographic.name}
              />
            ))}
          </FormGroup>
          <FormHelperText>
            Select the target demographic(s) you would like your campaign to
            reach.
          </FormHelperText>
        </FormControl>
      </div>
    )
  }
}

DemographicsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DemographicsList)
