const dummy = blogs => {
	return 1;
};

const totalLikes = blogs => {
	const totalLikes =
		blogs.length === 0
			? 0
			: blogs.reduce((sum, blog) => {
					return sum + blog.likes;
			  }, 0);
	return totalLikes;
};

const favoriteBlog = blogs => {
	const favoriteBlog = blogs.reduce((prev, curr) => {
		return prev.likes > curr.likes ? prev : curr;
	}, 0);

	const { title, author, likes } = favoriteBlog;

	return { title, author, likes };
};

module.exports = { dummy, totalLikes, favoriteBlog };
