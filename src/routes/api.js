module.exports = [
  {
    model: 'character',
    path: '/character',
    handler: 'find',
  },
  {
    model: 'episode',
    path: '/episode',
    handler: 'find',
  },
  {
    model: 'character',
    path: '/character/:id',
    handler: 'findById',
  },
  {
    model: 'episode',
    path: '/episode/:id',
    handler: 'findById',
  },
]

