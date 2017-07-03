import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Posts,
    VideoArea
} from '../../components/';
import Dropzone from 'react-dropzone'
import { uploadVideoRequest } from './../../api/videos';

const storageKey = 'posts';

class VideosScene extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            post: {value: ''},
            posts: []
        }
    }

    componentDidMount() {
       
    }

    handleSubmit(post) {
        const { posts } = this.state;
        const postArray = posts.concat(post);
        saveArray(storageKey, postArray);
        this.setState({
            posts: postArray,
            value: '' });
    }

    onDrop(acceptedFiles, rejectedFiles, info) {
        const { title, description } = info;
        const video = acceptedFiles[0];
        uploadVideoRequest({
            file: video,
            title: title || video.name,
            description: description || video.name
        })
    }

    render () {
        const { post, posts } = this.state;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <Posts posts={posts} />
                </div>
                <div className='row'>
                    <VideoArea handleOnDrop={this.onDrop} />
                </div>
            </div>
        )
    }
}

export default VideosScene;
