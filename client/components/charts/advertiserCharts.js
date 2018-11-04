import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class AdvertiserChart extends Component {
  constructor() {
    super()
  }
  render() {
    const currentUser = this.props.userId
    let allContracts = currentUser => {
      axios({
        method: 'GET',
        url: `http://localhost:8080/api/contracts/user/${currentUser}`
      })
        .then(response => {
          const resdata = response.data
          const campaigns = resdata
            .map(data => data.contract)
            .map(contract => contract.campaign)
          console.log('resdata', resdata)
          const campaignObj = {}
          for (let i = 0; i < resdata.length; ++i) {
            let currentContr = resdata[i]
            if (!campaignObj[currentContr.contract.campaign.name]) {
              campaignObj[currentContr.contract.campaign.name] =
                currentContr.contract.clickCount
            } else {
              campaignObj[currentContr.contract.campaign.name] +=
                currentContr.contract.clickCount
            }
            console.log('current', campaignObj)
          }
          var ctx = document.getElementById('myChart')
          var color = []
          var dynamicColors = function() {
            var r = Math.floor(Math.random() * 255)
            var g = Math.floor(Math.random() * 255)
            var b = Math.floor(Math.random() * 255)
            return 'rgb(' + r + ',' + g + ',' + b + ')'
          }
          for (var i in campaignObj) {
            color.push(dynamicColors())
          }
          var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              datasets: [
                {
                  data: Object.values(campaignObj),
                  backgroundColor: color
                }
              ],
              labels: Object.keys(campaignObj)
            },

            options: Chart.defaults.doughnut
          })
        })
        .then(console.log)
    }
    return allContracts(currentUser)
  }
}

const mapState = state => {
  return {
    userId: state.user.currentUser.id
  }
}

export default connect(mapState)(AdvertiserChart)
