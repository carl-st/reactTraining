import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import renderHtml from './../../helpers/imageEmbeder'
import { isEmpty } from 'lodash'; 
import classNames from 'classnames';

import userImageFallback from './../../img/avatar_2x.png';
class Post extends Component {
    constructor(props) {
        super(props);
        this.handleVisibilityClick = this.handleVisibilityClick.bind(this);
        this.state =  {
            visible: true
        }
    }

    handleVisibilityClick() {
        this.setState(({ visible }) => ({ visible: !visible }));
    }

    render() {
        const { children, date, image, username } = this.props;
        const { visible } = this.state;
        const userImage = isEmpty(image) ? userImageFallback : image;
        const userName = isEmpty(username) ? 'Anonymous' : username;
        const panelBodyClassNames = classNames('panel-body', { 'hidden': !visible });
        return (
            <div className='row' onClick={this.handleVisibilityClick}>
                <div className='col-sm-1'>
                    <div className='thumbnail'>
                        <img
                            className='img-responsive user-photo'
                            src={userImage}
                        />
                    </div>
                </div>
                <div className='post-column'>
                    <div className='panel panel-default'>
                        <div className='panel-heading'>
                            <strong>{userName}</strong>
                            <span className='text-muted'> {moment(date).fromNow()}</span>
                        </div>
                        <div  className={panelBodyClassNames} dangerouslySetInnerHTML={renderHtml(children)} />
                    </div>
                </div>
            </div>
        );
    };
};

Post.propTypes = {
    children: PropTypes.node,
    date: PropTypes.number,
    image: PropTypes.string,
    username: PropTypes.string
};

export default Post;
