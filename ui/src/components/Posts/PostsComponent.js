import React from 'react';
import PropTypes from 'prop-types';
import { Post } from './../Post/';
const Posts = props => {
    const { posts } = props;
    const postRender = [];
    posts.map(function (post, index) {
        postRender.push(<Post
            date={post.date}
            image={post.image}
            key={index}
            username={post.username}
        >
            {post.value}
        </Post>)
    }, this);
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12'>
                    <h3>Comments</h3>
                </div>
            </div>
            {postRender}
        </div>
    );
};

Posts.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.number,
        username: PropTypes.string,
        image: PropTypes.string,
        value: PropTypes.string
    }))
};

export default Posts;
