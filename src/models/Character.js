const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const { collection } = require('../utils/helpers')

const { Schema } = mongoose

const characterSchema = new Schema({
  id: Number,
  name: String,
  species: String,
  bounty: String,
  devilFruit: String,
  status: String,
  gender: String,
  firstCameo: String,
  image: String,
  url: String,
})

characterSchema.statics.structure = (res) => {
  const sortSchema = ({ id, name, status, species, bounty, devilFruit, gender, image, firstCameo, url }) => ({
    id,
    name,
    status,
    species,
    bounty,
    devilFruit,
    gender,
    image,
    firstCameo,
    url
  })

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res)
}

characterSchema.statics.findAndCount = async function ({ name, bounty, status, species, gender, skip }) {
  const q = (key) => new RegExp(key && (/^male/i.test(key) ? `^${key}` : key.replace(/[^\w\s]/g, '\\$&')), 'i')

  const query = {
    name: q(name),
    status: q(status),
    species: q(species),
    bounty: q(bounty),
    gender: q(gender),
  }

  const [data, count] = await Promise.all([
    this.find(query).sort({ id: 1 }).select(collection.exclude).limit(collection.limit).skip(skip),
    this.find(query).countDocuments(),
  ])

  const results = this.structure(data)

  return { results, count }
}

characterSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('Character', characterSchema)
