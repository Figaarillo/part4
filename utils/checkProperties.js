/**
 * check that the properties are correct
 * @param {*} blog
 * @returns false if missing a property or the object blog if is correct
 */
const checkProperties = (blog) => {
  if (blog.title === undefined || blog.url === undefined) {
    throw new Error('Error, missing property')
  }
  if (blog.likes === undefined) {
    return (blog.likes = 0)
  }
  return blog
}

module.exports = checkProperties
