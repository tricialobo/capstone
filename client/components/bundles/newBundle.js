import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { addBundle, addNew } from '../../store'
import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Button
} from '@material-ui/core'

class AddBundle extends Component {
  constructor() {
    super()
    this.state = {
      projectName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => {
    this.setState({ projectName: event.target.value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.addBundle({
      userId: this.props.user.id,
      projectName: this.state.projectName
    })
    this.setState({ projectName: '' })
    this.props.addNew()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup style={{ margin: '1em' }}>
            <FormControl>
              <InputLabel>Project Name</InputLabel>
              <Input
                name="projectNmae"
                type="text"
                onChange={this.handleChange}
              />
            </FormControl>
            <br />
            <Button type="submit">Create</Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    addBundle: obj => dispatch(addBundle(obj)),
    addNew: () => dispatch(addNew())
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddBundle))
