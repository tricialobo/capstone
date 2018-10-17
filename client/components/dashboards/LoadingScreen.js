import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  container: {
    display: 'flex',
    justify: 'center'
  }
})

const LoadingScreen = props => {
  const { classes } = props
  return (
    <Grid container justify="center">
      <img
        className={classes.container}
        src="https://cdn.dribbble.com/users/1573707/screenshots/3712012/aug-4-2017-6-11-pm.gif"
      />
    </Grid>
  )
}

export default withStyles(styles)(LoadingScreen)
