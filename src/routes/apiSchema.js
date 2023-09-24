module.exports = [
  {
    model: 'episode',
    path: '/episode/arc',
    handler: 'find',
  },

  {
    model: 'episode',
    path: '/episode/saga',
    handler: 'find',
  },

  {
    model: 'episode',
    path: '/episode/arc/:arc',
    handler: 'findByArc',
  },
  
  {
    model: 'episode',
    path: '/episode/saga/:saga',
    handler: 'findBySaga',
  },
]