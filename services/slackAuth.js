'use strict'

require('dotenv').config()
const request = require('request')

function authorizeWithAuthCode(authCode) {
  return new Promise((resolve, reject) => {
    const options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +authCode+
            '&client_id='+process.env.CLIENT_ID+
            '&client_secret='+process.env.CLIENT_SECRET+
            '&redirect_uri='+process.env.REDIRECT_URI,
        method: 'GET'
    }
    request(options, (error, response, body) => {
      var JSONresponse = JSON.parse(body)
      if (!JSONresponse.ok){
          reject(JSONresponse.error)
      } else {
        resolve({
          username: JSONresponse.user.name,
          slack_id: JSONresponse.user.id,
        })
      }
    })
  })
}


module.exports = {
  authorizeWithAuthCode,
}
