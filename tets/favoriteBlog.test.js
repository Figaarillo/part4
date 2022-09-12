const { favoriteBlog } = require('../utils/list_helper');

const blogs = require('../utils/blogsList');

describe('favorite blog', () => {
	test('of a bigger list is the blog with more likes', () => {
		result = favoriteBlog(blogs);

		expect(result).toEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		});
	});
});
