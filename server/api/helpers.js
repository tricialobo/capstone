const { Contract, User } = require('../db/models')
const axios = require('axios')
const getUser = async id => {
  try {
    return await User.findOne({
      where: {
        id: id,
        isActive: true
      },
      include: [{ model: Contract }]
    })
  } catch (error) {
    return error
  }
}

const sendEmail = (name, email, mail) => {
  axios({
    method: 'POST',
    url: 'http://localhost:8080/api/send',
    data: {
      name: name,
      email: email,
      mail: mail
    }
  }).then(response => {
    if (response.data.msg === 'success') {
      console.log('success!!!!')
    } else if (response.data.msg === 'fail') {
      console.log('Message failed to send.')
    }
  })
}

module.exports = { sendEmail, getUser }
