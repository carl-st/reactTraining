'use strict';

const bookshelf = require('../dao/bookshelf');
const Video = require('./video');

const VideoFormat = bookshelf.Model.extend({
    tableName: 'video_formats',
    video: function () {
        return this.hasOne(Video);
    }
});

module.exports = VideoFormat;
