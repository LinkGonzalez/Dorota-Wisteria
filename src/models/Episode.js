const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const { collection } = require('../utils/helpers')

const { Schema } = mongoose

const episodeSchema = new Schema({
  id: Number,
  name: String,
  episode: String,
  characters: [String],
  arc: String,
  saga: String,
  url: String
})

episodeSchema.statics.structure = (res) => {
  const sortSchema = ({ id, name, episode, arc, saga, url }) => ({
    id,
    name,
    episode,
    arc,
    saga,
    url
  })

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res)
}

episodeSchema.statics.findAndCount = async function ({ name, episode, skip }) {
  const q = (key) => new RegExp(key && key.replace(/[^\w\s]/g, '\\$&'), 'i')

  const query = {
    name: q(name),
    episode: q(episode),
  }

  const [data, count] = await Promise.all([
    this.find(query).sort({ id: 1 }).select(collection.exclude).limit(collection.limit).skip(skip),
    this.find(query).countDocuments(),
  ])

  const results = this.structure(data)

  return { results, count }
}

episodeSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('Episode', episodeSchema)
