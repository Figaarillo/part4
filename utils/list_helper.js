const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes =
    blogs.length === 0
      ? 0
      : blogs.reduce((sum, blog) => {
        return sum + blog.likes
      }, 0)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr
  }, 0)

  const { title, author, likes } = favoriteBlog

  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = {}

  // Get an object where each key is the name of the author and each value is the number of published blogs
  blogs.forEach(({ author }) => {
    blogsByAuthor[author] = (blogsByAuthor[author] ?? 0) + 1
  })

  // Sort each author by blogs number and keep only the first
  const authorWithMoreBlogs = Object.entries(blogsByAuthor).sort(
    (a, b) => b[1] - a[1]
  )[0]

  // return as expected object
  return { author: authorWithMoreBlogs[0], blogs: authorWithMoreBlogs[1] }
}

const mostLikes = (blogs) => {
  const likesByAuthor = {}

  // Get an object where each key is the name of the author and each value is the number of likes
  blogs.forEach(({ author, likes }) => {
    likesByAuthor[author] = (likesByAuthor[author] ?? 0) + likes
  })

  //  Sort each authors by number of likes and keep only the first
  const authorWithMoreLikes = Object.entries(likesByAuthor).sort(
    (a, b) => b[1] - a[1]
  )[0]

  // return as expected object
  return { author: authorWithMoreLikes[0], likes: authorWithMoreLikes[1] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
