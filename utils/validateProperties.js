/**
 * check that the properties are correct. throw an error if missing a property or the object blog if is correct
 * @param {*}
 * @returns
 */
const validateMissingBlogProperties = (blog) => {
  if (blog.title === undefined || blog.url === undefined) {
    throw new Error('missing blog property')
  }
  if (blog.likes === undefined) {
    return (blog.likes = 0)
  }
  return blog
}

const validateLikesField = (likes) => {
  likes = Number(likes)

  if (!likes) {
    throw new Error('field cannot be updated, invalid likes field')
  }

  likes = Math.round(likes)

  if (likes < 0) {
    throw new Error('field cannot be updated, invalid likes field')
  }

  return likes
}

module.exports = { validateMissingBlogProperties, validateLikesField }
