import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Remove from '@material-ui/icons/Remove'
import {removeAdFromCamp} from '../../store'


const StyledTileBar = withStyles({
  titleWrap: {
    marginLeft: 0
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

class AdsGridList extends Component {
  constructor () {
    super()
    this.removeClick = this.removeClick.bind(this)
  }
  
  async removeClick(campId, adId) {
    await this.props.removeAd(campId, adId)
  }

  render() {
    const { classes } = this.props
    const ads = this.props.ads
    return (
      <div>
        <GridList cellHeight={450} spacing={24} cols={3}>
          {ads.map(ad => (
            <GridListTile className={classes.adTile} key={ad.id}>
              <img src={ad.image} alt={ad.name} />
              <StyledTileBar className={classes.tileBar} title={ad.name}
                 actionIcon={
                  <IconButton
                  onClick = {() =>this.removeClick(this.props.campaign.id, ad.id)} 
                    className={classes.icon}
                  >
                    <Remove/>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

const mapState = state => {
  return {
    campaign: state.campaigns.singleCampaign
  }
}

const mapDispatch = dispatch => {
  return {
    removeAd: (campId, adId) => dispatch(removeAdFromCamp(campId, adId))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AdsGridList))
