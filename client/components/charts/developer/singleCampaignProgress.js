import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class SingleCampaignProgress extends Component {
  constructor() {
    super()
  }

  render() {
    //code this tomorrow w/o hard coding
    //const currentCampaign = this.props.campaignId
    const currentCampaignId = 2
    const userid = this.props.userId
    let campaignProgress = campaignId => {
      axios({
        method: 'GET',
        url: `http://localhost:8080/api/contracts/${userid}/user`
      }).then(response => {
        const filteredCampaign = response.data
          .filter(contract => contract.contract.campaignId === campaignId)
          .map(campaign => campaign.contract.clickCount)
          .reduce((accumulator, currentValue) => accumulator + currentValue)

        var ctx = document.getElementById('myChart')
        var myBarChart = new Chart(ctx, {
          type: 'horizontalBar',

          data: {
            datasets: [
              {
                data: [filteredCampaign],
                backgroundColor: 'blue'
              }
            ],
            labels: ['Campaign name here']
          },
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    steps: 10,
                    // stepValue: 6,
                    max: 1000000
                  }
                }
              ]
            },
            legend: {
              display: false
            }
          }
        })
      })
    }
    return campaignProgress(currentCampaignId)
  }
}

const mapState = state => {
  return {
    userId: state.user.currentUser.id
  }
}

export default connect(mapState)(SingleCampaignProgress)
