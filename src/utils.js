'use strict';

const Promise = require('bluebird');
const exec = Promise.promisify(require('child_process').exec);
const fs = Promise.promisifyAll(require('fs'));
const Video = require('./models/video');

function getResourceByIDFactory(resourceModel) {
    return async function (ctx) {
        const resource = await resourceModel.where('id', ctx.params.id).fetch();

        if (!resource) {
            ctx.throw(404);
        }

        return resource;
    };
}

async function verifyAuthenticated(ctx, next) {
    if (ctx.isAuthenticated()) {
        return await next();
    }

    ctx.throw(401);
}

function range({ unit = 'bytes', maxChunkSize = 5242880 /* 5MB */} = {}) {
    const rangeParser = require('http-range-parse');
    const contentRange = require('content-range');

    return async (ctx, next) => {
        const rangeHeader = ctx.get('Range');

        if (rangeHeader) {
            let range;

            try {
                range = rangeParser(rangeHeader);
            } catch (e) {
                ctx.throw(400, 'Invalid range');
            }

            if (range.unit !== unit) {
                ctx.throw(412);
            }

            // If multiple ranges are requested, use only the first one
            range = range.ranges ? range.ranges[0] : range;

            ctx.range = {
                start: range.suffix ? range.suffix - maxChunkSize + 1 : range.first, // Calculate the chunk start if start is not given
                end: range.suffix ? range.suffix :
                    range.last ? Math.min(range.last, range.first + maxChunkSize - 1) : range.first + maxChunkSize - 1 // Make sure the requested chunk end doesn't exceed our limit; if none given - calculate it
            };

            await next();

            ctx.set('Content-Range', contentRange.format({
                unit,
                first: ctx.range.start,
                limit: Math.min(ctx.range.length - 1, ctx.range.end) - ctx.range.start + 1,
                length: ctx.range.length
            }));

            ctx.status = 206;
        } else {
            return await next;
        }
    };
}

const RESOLUTIONS = {
    720: '1280x720',
    360: '640x360'
};

async function processVideo(ctx, videoModel) {
    let stats;
    try {
        stats = await fs.statAsync(videoModel.path);
    } catch (e) {
        ctx.throw(400, 'Video file missing!');
    }

    videoModel.size = stats.size;

    const video = Video.forge(videoModel);

    await video.save();

    const processingCommand = [ `ffmpeg -y -i ${videoModel.path}` ];

    for (const resolution in RESOLUTIONS) {
        processingCommand.push(`-s ${RESOLUTIONS[resolution]} -f mp4 -strict -2 -acodec aac -vcodec libx264 ${videoModel.path}_${resolution}`);
    }

    await exec(processingCommand.join(' '));

    for (const resolution in RESOLUTIONS) {
        try {
            stats = await fs.statAsync(`${videoModel.path}_${resolution}`);

            await video.related('videoFormats').create({
                size: stats.size,
                resolution: resolution
            });
        } catch (e) {
        }
    }
}

module.exports = {
    getResourceByIDFactory,
    verifyAuthenticated,
    range,
    processVideo
};
