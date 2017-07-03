import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'

class VideoArea extends Component {
    constructor(props) {
        super(props);
        this.onHandleDrop = this.onHandleDrop.bind(this);
        this.onHandleChangeTitle = this.onHandleChangeTitle.bind(this);
        this.onHandleChangeDescription = this.onHandleChangeDescription.bind(this);
        this.state = {
            description: '',
            title: ''
        };
    }

    onHandleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    onHandleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    onHandleDrop(acceptedFiles, rejectedFiles) {
        this.props.handleOnDrop(acceptedFiles, rejectedFiles, this.state);
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
                                <form className='video-area'>
                                    <Dropzone onDrop={this.onHandleDrop} />
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

VideoArea.propTypes = {
    handleOnDrop: PropTypes.func.isRequired
};

export default VideoArea;
