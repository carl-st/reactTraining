import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextArea extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onHandleSubmitPost = this.onHandleSubmitPost.bind(this);
        this.onHandleChangeImage = this.onHandleChangeImage.bind(this);
        this.onHandleChangeUsername = this.onHandleChangeUsername.bind(this);
        this.state = {
            value: '',
            username: '',
            image: ''
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    onHandleChangeImage(event) {
        this.setState({image: event.target.value});
    }

    onHandleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    onHandleSubmitPost(event) {
        event.preventDefault();
        const { onHandleSubmit } = this.props;
        const {  image, username, value } = this.state;
        const date = Date.now();
        onHandleSubmit({
            username: username,
            date: date,
            image: image,
            value: value
        });
        this.setState({
            value: ''
        });    
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <h3>Post a comment</h3>
                </div>
    
                <div className='row'>    
                    <div className='col-md-6'>
                        <div className='widget-area no-padding blank'>
                            <div className='status-upload'>
                                <form onSubmit={this.onHandleSubmitPost}>
                                    <textarea
                                        onChange={this.handleChange}
                                        placeholder='What is or your mind?'
                                        value={this.state.value}
                                    />
                                    <div>
                                        <label className='name-input-label'>Name: </label>
                                        <input
                                            className='user-input'    
                                            onChange={this.onHandleChangeUsername}
                                            type='text'
                                            value={this.state.username}
                                        />
                                    </div>
                                    <div>
                                        <label className='image-input-label'>Profile image: </label>
                                        <input
                                            onChange={this.onHandleChangeImage}
                                            type='text'
                                            value={this.state.image}
                                        /> 
                                    </div>
                                    <button
                                        className='btn btn-success green'
                                        type='submit'
                                    >
                                        <i className='fa fa-share' />
                                        Share
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
        );
    }
}

TextArea.propTypes = {
    onHandleSubmit: PropTypes.func.isRequired
};

export default TextArea;
