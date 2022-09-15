const blogs = require('../utils/blogsList');
const { mostLikes } = require('../utils/list_helper');

describe('Most likes', () => {
	// I have to learn to write messages 😅😅
	test('from blogs list from the same author', () => {
		const result = mostLikes(blogs);

		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17,
		});
	});
});
