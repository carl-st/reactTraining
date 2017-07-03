'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

const _ = require('lodash');
const Busboy = require('busboy');
const uuid = require('uuid/v4');
const router = require('koa-router')();

const utils = require('../utils');
const Video = require('../models/video');

router.get('/', async ctx => {
    const videos = await Video.fetchPage({
        page: ctx.query.page,
        pageSize: ctx.query.limit
    });

    ctx.body = {
        videos: videos.toJSON(),
        pagination: videos.pagination
    };
});

router.post('/', utils.verifyAuthenticated, async ctx => {
    const busboy = new Busboy({
        headers: ctx.headers
    });

    const ALLOWED_FIELDS = [ 'title', 'description' ];
    const video = {
        path: path.resolve(process.env.STORAGE_ROOT, uuid()),
        author: ctx.state.user.id
    };

    busboy.on('file', (fieldname, file) => {
        if (fieldname === 'video') {
            file.pipe(fs.createWriteStream(video.path));
        }
    });

    busboy.on('field', (fieldname, value) => {
        if (_.includes(ALLOWED_FIELDS, fieldname)) {
            video[fieldname] = value;
        }
    });

    const busboyPromise = new Promise(resolve => {
        busboy.on('finish', resolve);
    });

    ctx.req.pipe(busboy);

    await busboyPromise;

    await utils.processVideo(ctx, video);

    ctx.status = 201;
});

const getVideoByID = utils.getResourceByIDFactory(Video);

router.get('/:id', async ctx => {
    ctx.body = await getVideoByID(ctx);
});

router.get('/:id/stream', utils.range(), async ctx => {
    const video = await getVideoByID(ctx);
    const readOptions = {};

    if (ctx.range) {
        const videoSize = parseInt(video.get('size'), 10);
        ctx.range.length = videoSize;

        readOptions.start = ctx.range.start;
        readOptions.end = Math.min(ctx.range.end, videoSize - 1);
    }

    ctx.body = fs.createReadStream(video.get('path'), readOptions);
});

router.get('/:id/stream/:resolution', utils.range(), async ctx => {
    const video = await getVideoByID(ctx);
    const format = await video.videoFormats().query('where', {resolution: ctx.params.resolution}).fetchOne();

    if (!format) {
        ctx.throw(404);
    }

    const readOptions = {};

    if (ctx.range) {
        const videoSize = parseInt(format.get('size'), 10);
        ctx.range.length = videoSize;

        readOptions.start = ctx.range.start;
        readOptions.end = Math.min(ctx.range.end, videoSize - 1);
    }

    ctx.body = fs.createReadStream(`${video.get('path')}_${format.get('resolution')}`, readOptions);
});

router.get('/:id/comments', async ctx => {
    const video = await getVideoByID(ctx);
    // FIXME: using array as an argument for fetchPage is a workaround for https://github.com/tgriesser/bookshelf/pull/1469
    const comments = await video.related('comments').fetchPage([{
        page: ctx.query.page,
        pageSize: ctx.query.limit
    }]);

    ctx.body = {
        comments: comments.toJSON(),
        pagination: comments.pagination
    };
});

router.post('/:id/comments', utils.verifyAuthenticated, async ctx => {
    if (!ctx.request.body.content) {
        ctx.throw(400, 'Comment content missing!');
    }

    const video = await getVideoByID(ctx);
    await video.related('comments').create({
        content: ctx.request.body.content,
        author: ctx.state.user.id
    });

    ctx.status = 201;
});

module.exports = router;
