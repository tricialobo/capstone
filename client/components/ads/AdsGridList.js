import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const StyledTileBar = withStyles({
  titleWrap: {
    marginLeft: 0,
    marginBottom: 15
  },
  title: {
    color: '#000',
    marginLeft: 0
  }
})(GridListTileBar)

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  adTile: {
    fontWeight: 'bolder',
    fontSize: '4em',
    textAlign: 'left',
    color: '#fff'
  },
  tileBar: {
    marginLeft: 0,
    color: '#000',
    background: '#fff'
  }
})

const AdsGridList = props => {
  const { classes } = props
  const ads = props.ads
  return (
    <div>
      <GridList cellHeight={450} spacing={24} cols={3}>
        {ads.map(ad => (
          <GridListTile className={classes.adTile} key={ad.id}>
            <img src={ad.image} alt={ad.name} />
            <StyledTileBar className={classes.tileBar} title={ad.name} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default withStyles(styles)(AdsGridList)
