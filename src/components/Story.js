import React from 'react';
import moment from 'moment';

import Comment from './Comment';

function Story(props) {
    const entry = props.entry;
    if (entry) {
        const date = moment(new Date(entry.time * 1000)).format('MMM DD, YYYY HH:mm');
        const comments = entry.kids ? entry.kids.map(comment => <Comment key={comment} id={comment} />) : undefined;
        return (
            <div className="reader">
                <div className="story-wrapper">
                    <div className="reader-header">
                        <h2>{entry.title}</h2>
                    </div>
                    <div className="tag">
                        <p>Submitted by <span className="story-subtext"> <i>{entry.by}</i></span> on <span className="story-subtext"> {date}</span> &#8729; <span className="story-subtext">{entry.descendants} comments</span></p>
                    </div>
                    <div className="actions">
                        <a href={entry.url} target="_blank">View Story (opens in new tab)</a>
                    </div>
                </div>
                <div className="reader-comments">
                    {comments}
                </div>
            </div>
        );
    }

    return <div className="story-zero-state">Click to view a story</div>;
}

export default Story;
