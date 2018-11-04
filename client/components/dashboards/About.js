import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  GridListTile,
  GridListTileBar,
  IconButton,
  GridList,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  CardMedia
} from '@material-ui/core/'
import { connect } from 'react-redux'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  card: {
    minWidth: 400,
    padding: '0 80px 0 80px'
  },
  content: {
    paddingTop: 45
  },
  grid: {
    marginTop: 100,
    padding: '0 70px 0 40px'
  },
  media: {
    objectFit: 'cover'
  }
})

class About extends Component {
  render() {
    const { classes } = this.props
    console.log('I"m home')
    return (
      <Card className={classes.card}>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Typography variant="display3" align="center">
              about us
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading" align="center">
              Grace was made with love by Tricia, Stacy, and Jan. ♡
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={40}
            className={classes.grid}
          >
            <Grid item xs={4}>
              <img src="/images/tricia.png" width={300} />
            </Grid>
            <Grid item xs={4}>
              <img src="/images/jan.png" width={300} />
            </Grid>
            <Grid item xs={4}>
              <img src="/images/stacy.png" width={300} />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    )
  }
}

export default withStyles(styles)(About)
