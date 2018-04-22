import React, { Component } from 'react';
import './Entry.css';

class Entry extends Component {
    
    render() {
        const entry = this.props.entry;

        return (
            <div className="entry-wrapper" onClick={() => this.props.clickHandler(entry)}>
                <div className="entry-title">
                    <h2>{entry.title}</h2>
                </div>
                <div className="entry-subtext">
                    <p>{entry.url}</p>
                </div>
                <div className="entry-footer">
                    <p>By <i>{entry.by}</i> &#8729; {entry.descendants} Comments</p>
                </div>
            </div>
        );
    }
}

export default Entry;
