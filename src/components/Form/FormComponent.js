import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
    constructor(props) {
        super(props);
        this.onTextAreaSubmit = this.onTextAreaSubmit.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
        this.state = {
            text: ''
        };
    }

    onTextAreaSubmit(event) {
         event.preventDefault();
         const { text } = this.state;
         const { onHandleSubmit } = this.props
         onHandleSubmit({
            text: text
         })
         this.setState({
            text: text
         })
    }

    onHandleChange(event) {
        this.setState({text: event.target.value})
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <h3>Write something</h3>
                </div>
            

                <div className='row'>
                    <form onSubmit={this.onTextAreaSubmit}> 
                        <textarea 
                            onChange={this.onHandleChange}
                            placeholder='Blah blah blah'
                            value={this.state.text}
                        />
                        <button
                            className='btn btn-success green'
                            type='submit'>
                            <i className='fa fa-share' />
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };
};

Form.propTypes = {
    onHandleSubmit: PropTypes.func.isRequired
};

export default Form;
