import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Posts,
    TextArea
} from '../../components/';

import { loadArray, saveArray } from './../../helpers/localStorageHelpers';

const storageKey = 'posts';

class MainScene extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            post: {value: ''},
            posts: []
        }
    }

    componentDidMount() {
        const posts = loadArray(storageKey);
        posts && this.setState({posts: posts});
    }

    handleSubmit(post) {
        const { posts } = this.state;
        const postArray = posts.concat(post);
        saveArray(storageKey, postArray);
        this.setState({
            posts: postArray,
            value: '' });
    }

    render () {
        const { post, posts } = this.state;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <Posts posts={posts} />
                </div>
                <div className='row'>
                    <TextArea onHandleSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

export default MainScene;
