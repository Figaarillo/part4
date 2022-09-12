const Blog = require('../model/blog');

const getBlogs = (_, res) => {
	Blog.find({}).then(blogs => res.json(blogs));
};

const addBlog = (req, res) => {
	const blog = req.body;

	const newBlog = new Blog(blog);

	newBlog.save().then(result => {
		res.status(201);
		return res.json(result);
	});
};

module.exports = { getBlogs, addBlog };
