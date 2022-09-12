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

module.exports = { dummy, totalLikes };
