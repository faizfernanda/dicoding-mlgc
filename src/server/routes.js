const { predictHandler, predictHistories } = require('../server/handler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: predictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        maxBytes: 1000000,
        multipart: true
      }
    }
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: predictHistories
  }
]
 
module.exports = routes;