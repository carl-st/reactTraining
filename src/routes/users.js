'use strict';

const router = require('koa-router')();

const Comment = require('../models/comment');
const Video = require('../models/video');

router.get('/:id/comments', async ctx => {
    const comments = await Comment.where('author', ctx.params.id).fetchPage({
        page: ctx.query.page,
        pageSize: ctx.query.limit
    });

    ctx.body = {
        comments: comments.toJSON(),
        pagination: comments.pagination
    };
});

router.get('/:id/videos', async ctx => {
    const videos = await Video.where('author', ctx.params.id).fetchPage({
        page: ctx.query.page,
        pageSize: ctx.query.limit
    });

    ctx.body = {
        comments: videos.toJSON(),
        pagination: videos.pagination
    };
});

module.exports = router;
