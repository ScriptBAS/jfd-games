const express = require("express");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const Game = require("../models/Game");

const router = express.Router({ mergeParams: true });

router
	.route("/")
	.get(async (req, res) => {
		try {
			const { orderBy, equalTo } = req.query;
			const list = await Game.find({ [orderBy]: equalTo }).sort({
				createdAt: "desc",
			});
			res.send(list);
		} catch (error) {
			res.status(500).json({
				message: "На сервере произошла ошибка. Попробуйте позже",
			});
		}
	})
	.post(auth, async (req, res) => {
		try {
			const newGame = await Game.create({
				...req.body,
				authorId: req.user._id,
			});
			res.status(201).send(newGame);
		} catch (error) {
			res.status(500).json({
				message: "На сервере произошла ошибка. Попробуйте позже",
			});
		}
	});

router.delete("/:gameId", auth, admin, async (req, res) => {
	try {
		const { gameId } = req.params;
		const removedGame = await Game.findById(gameId);
		if (
			removedGame.authorId.toString() !== req.user._id &&
			!req.user.isAdmin
		) {
			return res.status(401).json({ message: "Unauthorized" });
		} else {
			await removedGame.remove();
			return res.send(null);
		}
	} catch (error) {
		res.status(500).json({
			message: "На сервере произошла ошибка. Попробуйте позже",
		});
	}
});

router.patch("/:gameId", auth, admin, async (req, res) => {
	try {
		const { gameId } = req.params;
		const updatedGame = await Game.findById(gameId);
		if (
			req.user._id === updatedGame.authorId.toString() ||
			req.user.isAdmin
		) {
			await Game.updateOne(updatedGame, req.body, { new: true });
			const editedGame = await Game.findById(gameId);
			res.send(editedGame);
		} else {
			res.status(401).json({ message: "Unauthorized" });
		}
	} catch (error) {
		res.status(500).json({
			message: "На сервере произошла ошибка. Попробуйте позже",
		});
	}
});

module.exports = router;
