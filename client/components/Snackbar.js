import React, { Component } from 'react'
import {
  ListItem,
  List,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Button,
  Snackbar
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Add from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const Snackbar = props => {
  const { classes, text, openSnackbar, handleClose } = this.props
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={this.state.open}
      autoHideDuration={6000}
      onClose={this.handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">Note archived</span>}
      action={[
        <Button
          key="undo"
          color="secondary"
          size="small"
          onClick={this.handleClose}
        >
          UNDO
        </Button>,
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={this.handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  )
}

export default withStyles(styles)(Snackbar)
