import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <h3>Result</h3>
                    Test
                </div>
            </div>
        );
    };
};

export default Result;
