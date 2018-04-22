import React, { Component } from 'react';
import Comment from '../comment/Comment';

import './Story.css';

class Story extends Component {
    
    constructor() {
        super();
    }
    
    
    render() {
        const entry = this.props.entry;
        if (entry) {
            const date = new Date(entry.time);
            return (
                <div className="story">
                    <div className="story-wrapper">
                        <div className="story-title">
                            <h2>{entry.title}</h2>
                        </div>
                        <div className="story-details">
                            <p>Submitted by 
                                <span className="story-subtext"> <i>{entry.by}</i></span> on
                                <span className="story-subtext"> {date.toString()}</span> &#8729; 
                                <span className="story-subtext"> {entry.descendants} comments</span>
                            </p>
                        </div>
                        <div className="story-actions">
                            <a href={entry.url} target="_blank">View Story (opens in new tab)</a>
                        </div>
                    </div>
                    <hr/>
                    <div className="story-comments">
                        {entry.kids.map(comment => {
                            return <Comment key={comment} id={comment} />
                        })}
                    </div>
                </div>
            );
        }

        return <div className="story-zero-state">Click to view a story</div>
    }
}

export default Story;
