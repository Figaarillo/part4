const handleHTTPError = (res, message, code = 400) => {
  res.status(code)
  res.send({ error: message })
}

module.exports = handleHTTPError
