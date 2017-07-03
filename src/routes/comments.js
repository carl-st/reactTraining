'use strict';

const router = require('koa-router')();

const utils = require('../utils');
const Comment = require('../models/comment');

const getCommentByID = utils.getResourceByIDFactory(Comment);

router.delete('/:id', utils.verifyAuthenticated, async ctx => {
    const comment = getCommentByID(ctx);
    await comment.destroy();

    ctx.status = 204;
});

module.exports = router;
