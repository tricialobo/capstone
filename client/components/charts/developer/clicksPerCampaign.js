import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class CampaignClicksChart extends Component {
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
          }
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
          console.log('color', color)
          console.log('campaigns', campaignObj)
          var ctx = document.getElementById('myChart')
          console.log('labels', Object.values(campaignObj))
          var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
              datasets: [
                {
                  data: Object.values(campaignObj),
                  backgroundColor: color
                }
              ],
              labels: Object.keys(campaignObj)
            },

            options: {
              title: {
                display: true,
                text: 'Clicks per Campaign'
              },
              legend: {
                display: false
              }
            }
          })
          return myBarChart
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

export default connect(mapState)(CampaignClicksChart)
