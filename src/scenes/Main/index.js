import React, { Component } from 'react';
import PropTypes from 'prop-types';
import image from './../../img/avatar_2x.png';
import { Form } from '../../components/Form';
import { loadArray, saveArray } from './../../helpers/localStorageHelper';

const List = (props) => {
    const { texts } = props;
    const textRender = [];
    texts.map(function (textObject, index) {
        textRender.push(<ListElement key={index}>
            {textObject.text}
        </ListElement>)
    }, this);
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12'>
                    <h3>Texts: </h3>
                </div>
            </div>
            {textRender}
        </div>
    );
};

List.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
    }))
};

const ListElement = (props) => {  
    return (<div>{props.children}</div>);
};

ListElement.propTypes = {
    text: PropTypes.string
};

const storageKey = 'texts';

class MainScene extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            textsArray: []
        }
    }

    componentDidMount() {
        const texts = loadArray(storageKey);
        texts && this.setState({ textsArray: texts });
    }

    handleSubmit(textAreaValue) {
        const { textsArray } = this.state;
        const texts = textsArray.concat(textAreaValue);
        saveArray(storageKey, texts);
        this.setState({
            textsArray: texts
        });
    }
    
    render() {
        const { textsArray } = this.state;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <List texts={textsArray} />
                </div>

                <div className='row'>
                    <Form onHandleSubmit={this.handleSubmit} />
                </div>
            </div>
        )
    }
}

export default MainScene;
