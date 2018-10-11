import React, { Component } from 'react'
import { TextField, Typography, Grid } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
class ScriptTag extends Component {
  componentDidMount() {
    let bundleId = this.props.bundleId
    const updateBundle = axios({
      method: 'PUT',
      url: `http://localhost:8080/api/bundles/${bundleId}`,
      data: {
        ScriptTag: `<pre> <script> src="http://localhost:8080/api/scripts/${bundleId}.js" </script> </pre>`
      }
    }).then(response => {
      if (response.data.msg === 'success') {
        alert('success')
      } else if (response.data.msg === 'fail') {
        console.log('you did it wrong with put request')
      }
    })
    updateBundle()
  }
  render() {
    const { classes } = this.props
    //let bundleId = this.props.location.bundleId
    let bundleId = this.props.bundleId
    console.log('bundleId', bundleId)
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
          {/* &lt;pre&gt; &lt;script&gt; src="http://localhost:8080/api/scripts/{
          bundleId
        }.js" &lt;/script&gt; &lt;/pre&gt; */}
          <TextField
            id="outlined-bare"
            disabled
            multiline
            defaultValue={`<pre> <script> src="http://localhost:8080/api/scripts/${bundleId}.js" </script> </pre>`}
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

// return (
//   <div>
//     <h3>Paste the code below into your app:</h3>

//     <pre>
//       &lt;script&gt; src="http://localhost:3000/api/scripts/1.js"
//       &lt;/script&gt;
//     </pre>
//   </div>
