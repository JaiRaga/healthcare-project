const express = require('express');
const auth = require('../../middleware/auth');
const { update } = require('../../models/Social');
const router = express.Router();
const Social = require('../../models/Social');

// Create a Social Media Post
router.post('/social/post', auth, async (req, res) => {
	console.log(req.body);
	const text = req.body.text;
	const post = new Social({ text, owner: req.user._id });

	try {
		await post.save();
		res.status(201).send(post);
	} catch (err) {
		console.log(err.message);
		res.status(400).send(err.message);
	}
});

// Get all Posts
router.get('/social/posts', auth, async (req, res) => {
	try {
		const posts = await Social.find();

		Promise.all(posts.map(async post => {
			await post.populate('owner').execPopulate()
			await post.save()
			return post
		}))
			.then((result) => res.send(result))
			.catch((err) => console.log(err));
		// res.send(posts);
	} catch (err) {
		console.log(err.messsage);
		res.status(500).send(err.message);
	}
});

// Get a Post By Id
router.get('/social/post/:id', auth, async (req, res) => {
	try {
		const post = await Social.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!post) return res.status(404).send('No Post Found!');

		res.send(post);
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err.message);
	}
});

// Update a Post
router.patch('/social/post/:id', auth, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedFields = ['text'];
	const isValidUpdate = updates.every((update) =>
		allowedFields.includes(update)
	);

	if (!isValidUpdate) res.status(400).send('Invalid Operation');

	try {
		const post = await Social.findOne({ _id, owner: req.user._id });
		// const post = await Social.findOne({ _id });

		if (!post) return res.status(404).send('No Post Found!');

		updates.forEach((update) => (post[update] = req.body[update]));

		await post.save();

		res.send(post);
	} catch (err) {
		console.log(err.message);
		res.status(400).send(err.message);
	}
});

// Delete a Post
router.delete('/social/post/:id', auth, async (req, res) => {
	try {
		const post = await Social.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!post) return res.status(404).send('No Post Found!');

		res.send(post);
	} catch (err) {
		console.log(err.message);
		res.status(500).send(err.message);
	}
});

module.exports = router;
