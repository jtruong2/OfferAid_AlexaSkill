const url = require('./url')
let axios = require('axios')

let post = (obj) => {
  axios({
    url: `${url}/api/v1/user/1/alexa_donations`,
    method: 'POST',
    data: {
      items: obj['items'],
      pickup_date: obj['date'],
      pickup_address: obj['location']
    }
  }).then((response) => {
    console.log(response, 'hi')
  }).catch((error) => {
    console.log(error)
  })
}
//
// let get = (response) => {
//   request({
//     url: `${url}/api/v1/user/1/items`,
//     method: 'GET',
//   }, function(error, response, body) {
//     if(!error && response.statusCode == 200) {
//       console.log('BODY: ', body)
//       var jsonResponse = JSON.parse(body)
//       console.log(jsonResponse)
//     }
//   })
// }

module.exports = {post}
