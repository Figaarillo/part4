const blogs = require('../utils/blogsList')
const { mostBlogs } = require('../utils/list_helper')

describe.skip('Most blogs', () => {
  test('from blogs list published by the same author', () => {
    const result = mostBlogs(blogs)

    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})
