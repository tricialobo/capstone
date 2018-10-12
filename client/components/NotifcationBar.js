import React, { Component } from 'react'
import {
  ListItem,
  List,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Snackbar
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Add from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
})

const NotificationBar = props => {
  const { classes, text, openSnackbar, handleClose } = props
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">{text}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  )
}

export default withStyles(styles)(NotificationBar)
