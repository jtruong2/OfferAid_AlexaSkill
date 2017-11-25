const url = require('./url')
let axios = require('axios')

let post = (obj) => {
  return axios({
    url: `${url}/api/v1/user/1/alexa_donations`,
    method: 'POST',
    data: {
      items: obj['items'],
      pickup_date: obj['date'],
      pickup_address: obj['location']
    }
  }).then((response) => response.data).catch((error) =>console.log(error))
}

let get = (callback) => {
  return axios.get(`${url}/api/v1/user/1/items`).then((response) => response.data['count']).catch((error) => console.log(error))
}
// function(error, response, body) {
//   if(!error && response.statusCode == 200) {
//     console.log('BODY: ', body)
//     var jsonResponse = JSON.parse(body)
//     return jsonResponse['count']
//   }
// })
module.exports = {post, get}
