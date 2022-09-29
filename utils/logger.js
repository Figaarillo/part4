const info = (message) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(message)
  }
}

const error = (message) => {
  console.error(message)
}

module.exports = { info, error }
