import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import { addAd, removeAdFromCamp } from '../../store'

const StyledTileBar = withStyles({
  titleWrap: {
    marginLeft: 0
  },
  title: {
    color: '#000',
    marginLeft: 0
  },
  subtitle: {
    color: '#000'
  }
})(GridListTileBar)

const styles = theme => ({
  adTile: {
    marginTop: 13,
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

class AdsGridList extends Component {
  constructor() {
    super()
    this.addClick = this.addClick.bind(this)
  }

  async addClick(campId, adId) {
    await this.props.addAd(campId, adId)
  }

  async removeClick(campId, adId) {
    await this.props.removeAdFromCamp(campId, adId)
  }

  render() {
    console.log('in ad advert')
    const { classes } = this.props
    const ads = this.props.allAds
    return (
      <GridList cellHeight={280} spacing={24} cols={3}>
        {ads &&
          ads.length &&
          ads.map(ad => (
            //<button onClick = {() => this.addClick(this.props.campId, ad.id)}>add</button>
            //<button onClick = {() => this.removeClick(this.props.campId, ad.id)}>remove</button>
            <GridListTile className={classes.adTile} key={ad.id}>
              <img src={ad.image} alt={ad.name} />
              <StyledTileBar
                className={classes.tileBar}
                title={ad.name}
                actionIcon={
                  <IconButton
                    onClick={() => this.addClick(this.props.campId, ad.id)}
                    className={classes.icon}
                  >
                    <Add />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
      </GridList>
    )
  }
}

const mapState = state => {
  return {
    allAds: state.ads.allAds
  }
}

const mapDispatch = dispatch => {
  return {
    addAd: (campId, adId) => dispatch(addAd(campId, adId)),
    removeAdFromCamp: (campId, adId) => dispatch(removeAdFromCamp(campId, adId))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AdsGridList))
