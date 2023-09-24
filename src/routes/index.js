const express = require('express')

const { baseUrl, message } = require('../utils/helpers')
const getHandler = require('./middlewares')
const api = require('./api')

const apiSchema = require('./apiSchema')

const episode = require('../models/Episode')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    characters: `${baseUrl}/character`,
    episodes: `${baseUrl}/episode`,
  })
})

apiSchema.forEach((endpoint) => {
  const {path, handler} = endpoint

  router.get(path, (req, res) => {

    const param = req.params[handler === 'findByArc' ? 'arc' : 'saga']
    const query = { [handler === 'findByArc' ? 'arc' : 'saga']: param }
    const field = path.includes('arc') ? 'arc' : 'saga'

    if(handler === 'find'){

      episode.distinct(field)
      .then((data) => {
        res.json(data)
      })

    }else{

      episode.find(query)
      .select('-_id -__v')
      .sort({id: 1})
      .then((data) => {
        if (data.length === 0) {
          res.status(404).json({ error: handler === 'findByArc' ? message.noArc : message.noSaga })
        } else {
          res.json(data)
        }
      })
      
    }
  })
})

router.get('/character/avatar', (req, res) => {
  res.status(404).json({ error: message.noPage })
})

api.forEach((endpoint) => {
  const handler = getHandler(endpoint.model)
  router.get(endpoint.path, handler[endpoint.handler])
})

module.exports = router
