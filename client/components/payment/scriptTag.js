import React, { Component } from 'react'
import { TextField, Typography, Grid } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
class ScriptTag extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props
    let bundleId = this.props.bundleId
    return (
      <Grid container justifyContent="center">
        <Grid className={classes.contain}>
          <Typography variant="subheading">
            Copy the below script into your code to serve this ad package.
          </Typography>
          <Typography variant="body1">
            Make sure to include the div you would like the ads to populate with
            id “adtarget”
          </Typography>

          <TextField
            id="outlined-bare"
            disabled
            multiline
            defaultValue={`<script src="http://localhost:8080/api/scripts/${bundleId}.js" />`}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  contain: {
    margin: 'auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 650
  }
})

export default withStyles(styles)(ScriptTag)
