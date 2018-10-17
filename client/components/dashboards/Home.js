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
import { fetchAllAds, fetchAllUserCampaigns } from '../../store'

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
    padding: '0 40px 0 40px'
  },
  media: {
    objectFit: 'cover'
  }
})

class Home extends Component {
  async componentDidMount() {
    await this.props.fetchAllAds()
    await this.props.fetchAllUserCampaigns()
  }

  render() {
    const { classes } = this.props
    console.log('I"m home')
    return (
      <Card className={classes.card}>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Typography variant="display3" align="center">
              grace
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <CardMedia
              component="img"
              alt="grace ui mockup"
              className={classes.media}
              height="580"
              image="/images/mockup.png"
              title="Contemplative Reptile"
            />
          </Grid>
          <Grid container xs={4} alignItems="center">
            <Typography variant="display2">
              Advertising is hard.<br />
              We make finding your audiences easy.
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={40} className={classes.grid}>
          <Grid item xs={4}>
            <Divider />
            <br />
            <Typography variant="display1">Build better ads.</Typography>
            <Typography variant="subheading">
              Grace is a premium ad network connecting highly qualified
              audiences with highly relevant services, products, and brands. The
              result is an increased ROI + brand exposure for advertisers and a
              better experience for readers.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
            <br />
            <Typography variant="display1">Reach your audiences.</Typography>
            <Typography variant="subheading">
              Your ads appear next to content that’s valuable to your audience
              and relevant to your brand.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
            <br />
            <Typography variant="display1">It's never been easier.</Typography>
            <Typography variant="subheading">
              Grace’s simple ad design and secure Ethereum payment system makes
              paying and getting paid a breeze.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    )
  }
}

const mapState = state => ({
  allAds: state.ads.allAds,
  allUserCampaigns: state.allUserCampaigns
})

const mapDispatch = dispatch => ({
  fetchAllAds: () => dispatch(fetchAllAds()),
  fetchAllUserCampaigns: () => dispatch(fetchAllUserCampaigns())
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Home))
