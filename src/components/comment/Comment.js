import React, { Component } from 'react';
import './Comment.css';

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
        if (!comment.kids) {
            comment.kids = [];
        }

        let date = new Date(comment.time);

        if (!this.state.hidden) {
            return (
                <div className="comment">
                    <div className="comment-wrapper">
                        <div className="comment-details">
                            <div className="">
                                <p>By
                                    <span className="comment-subtext">{comment.by}</span> on
                                    <span className="comment-subtext"> {date.toString()}</span>
                                </p>
                            </div>
                            <span className="comment-actions" onClick={this.toggleVisibility}>hide</span>
                        </div>
                        <hr/>
                        <div className="comment-text">
                            <span dangerouslySetInnerHTML={{ __html: comment.text }}></span>
                        </div>
                    </div>
                    <div className="comment-replies">
                        {
                            comment.kids.map(id => {
                                return <Comment key={id} id={id} />
                            })
                        }
                    </div>
                </div>
            );
        }
        return (
            <div className="comment-wrapper">
                <div className="comment-details">
                    <div className="">
                        <p>By <span className="comment-subtext">{comment.by}</span> on <span className="comment-subtext">{date.toString()}</span></p>
                    </div>
                    <span className="comment-actions" onClick={this.toggleVisibility}>show</span>
                </div>
            </div>
        );
    }
}

export default Comment;
