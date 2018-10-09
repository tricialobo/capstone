import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import React, {Component} from 'react'
import {addBundle} from '../store'

class AddBundle extends Component {
    constructor() {
      super()
      this.state = {
        projectName: '',
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleChange = event => {
      this.setState({projectName: event.target.value})
      console.log(this.state.projectName)
    }
  
    handleSubmit = async event => {
      event.preventDefault()
      await this.props.addBundle({userId: this.props.user.id, projectName: this.state.projectName})
      this.setState({projectName: ''})
    }
  
    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
            Project Name:
            <input type = "text" name = 'projectName' onChange = {this.handleChange}/>
            <button onClick = {() => this.handleSubmit}>Submit</button>
            </form>
          </div>
        )
      }
    }
  
  const mapState = state => {
    return {
      user: state.user.currentUser,
    }
  }
  
  const mapDispatch = dispatch => {
    return {
      addBundle: obj => dispatch(addBundle(obj))
    }
  }
  
export default withRouter(connect(mapState, mapDispatch)(AddBundle))




  