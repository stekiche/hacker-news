import React, { Component } from 'react';
import moment from 'moment';

class Comment extends Component {
    
    constructor() {
        super();
        this.state = {
            comment: {},
            hidden: false
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    componentWillMount() {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.id}.json`)
        .then(res => res.json())
        .then(res => {
            this.setState({comment: res});
        })
    }

    toggleVisibility() {
        const newState = !this.state.hidden;
        this.setState({hidden: newState});
    }
    
    render() {
        const comment = this.state.comment;
        
        const replies = comment.kids ? comment.kids.map(id => <Comment key={id} id={id} />) : [];
        const time = moment(new Date(comment.time * 1000 || 0)).fromNow();

        if (!this.state.hidden) {
            return (
                <div className="comment">
                    <div className="comment-header">
                        <div className="tag">
                            <span>By <span className="helper-text">{comment.by}</span> &#8729; <span className="helper-text">{time}</span></span>
                        </div>
                        <span className="action" onClick={this.toggleVisibility}>hide</span>
                    </div>
                    <div className="comment-body">
                        <span dangerouslySetInnerHTML={{ __html: comment.text }}></span>
                    </div>
                    <div className="comment-replies">{replies}</div>
                </div>
            );
        }
        return (
            <div className="comment">
                <div className="comment-header">
                    <div className="tag">
                        <p>By <span className="helper-text">{comment.by}</span> &#8729; <span className="helper-text">{time}</span></p>
                    </div>
                    <span className="action" onClick={this.toggleVisibility}>show</span>
                </div>
            </div>
        );
    }
}

export default Comment;
