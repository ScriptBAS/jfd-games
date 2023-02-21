const express = require('express');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const Comment = require('../models/Comment');

const router = express.Router( { mergeParams: true });

router
    .route('/')
    .get(async(req, res) => {
        try {
            const { orderBy, equalTo } = req.query;
            const list = await Comment.find({ [orderBy]: equalTo });
            res.send(list);
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            });
        }
    })
    .post(auth, async(req, res) => {
        try {
            const newComment = await Comment.create({
                ...req.body,
                userId: req.user._id
            });
            res.status(201).send(newComment);
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            });
        }
    });

    router.delete('/:commentId', auth, admin, async (req, res) => {
        try {
            const { commentId } = req.params;
            const removedComment = await Comment.findById(commentId);
            if ((removedComment.userId.toString() === req.user._id) || req.user.isAdmin) {
                await removedComment.remove();
                return res.send(null);
            } else {
                return res.status(401).json({ message: "Unauthorized" })
            };
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            });
        };
    });

module.exports = router;