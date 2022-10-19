const unknowEndpoint = (_, res) => {
  return res.status(404).send({ error: 'unknow endpoint' })
}

module.exports = unknowEndpoint
