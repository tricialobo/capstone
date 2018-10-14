import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const TableHeaderCell = withStyles(theme => ({
  root: {
    padding: '30px'
  },
  head: {
    borderBottom: '2px solid black'
  },
  body: {
    fontSize: 16
  }
}))(TableCell)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    padding: '0 30px 0 30px'
  },
  table: {
    minWidth: '100%'
  },
  row: {
    borderBottom: '2px solid'
  }
})

const ProjectsTable = props => {
  const { classes, project } = props

  return (
    <Grid container className={classes.root}>
      <Divider />
      <Link
        to={{
          pathname: '/checkout',
          state: { bundleId: project.id }
        }}
      >
        <Typography variant="subheading">{project.projectName}</Typography>
      </Link>
      <br />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Campaign name</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {project.campaigns && project.campaigns.length ? (
            project.campaigns.map(campaign => {
              return (
                <TableRow className={classes.row} key={campaign.id}>
                  <TableCell component="th" scope="row">
                    {campaign.name}
                  </TableCell>
                  <TableCell>{campaign.price} ETH</TableCell>
                  <TableCell>
                    {campaign.isActive ? 'Active' : 'Inactive'}
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <Typography variant="body1">
              <br />
              No campaigns have been added to this project yet.
            </Typography>
          )}
        </TableBody>
      </Table>
    </Grid>
  )
}

ProjectsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProjectsTable)
