const baseUrl = 'https://one-piece-api.netlify.app/.netlify/functions/api'

const message = {
  noPage: 'There is nothing here',
  noCharacter: 'Character not found',
  noEpisode: 'Episode not found',
  noArc: 'Arc not found',
  noSaga: 'Saga not found',
  badParam: 'Hey! you must provide an id',
  badArray: 'Bad... bad array :/',
}

const collection = {
  exclude: '-_id -author -__v -edited',
  limit: 20,
  queries: {
    character: ['name', 'status', 'species', 'bounty', 'gender'],
    episode: ['name', 'episode', 'arc', 'saga'],
  },
}


module.exports = {
  baseUrl,
  message,
  collection,
}
