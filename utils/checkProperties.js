const checkProperties = (blog) => {
  if (blog.likes === undefined) {
    return (blog.likes = 0)
  }
}

module.exports = checkProperties
