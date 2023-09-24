const catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next)

const notFound = (req, res, next) => {
  const err = new Error('Theres is nothing here.')
  err.status = 404
  next(err)
}

const productionErrors = (err, req, res, next) => {
  res.status(err.status || 500)
  res.json({error: err.message})
}

module.exports = {
  catchErrors,
  notFound,
  productionErrors
}