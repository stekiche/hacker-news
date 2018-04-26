import React, { Component } from 'react';

class Entry extends Component {
    
    render() {
        const entry = this.props.entry;

        return (
            <div className="card column" onClick={() => this.props.clickHandler(entry)}>
                <div className="header">
                    <h2>{entry.title}</h2>
                </div>
                <div className="card-action">
                    <a href={entry.url} target="_blank">{entry.url}</a>
                </div>
                <div className="footer">
                    <p>By <i>{entry.by}</i> &#8729; {entry.descendants} Comments</p>
                </div>
            </div>
        );
    }
}

export default Entry;
