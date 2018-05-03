import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
    openStory,
    updateIndex,
    updateStories,
    updateTopStoriesIds
} from './actions';
import Entry from './components/Entry';
import Story from './components/Story';

const PAGE_SIZE = 7;
class App extends Component {
    
    API_BASE = 'https://hacker-news.firebaseio.com/v0/';

    constructor(props) {
        super(props);
        this.displayStory = this.displayStory.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }

    componentWillMount() {
        this.getTopStories().then(ids => {
            this.props.updateTopStoriesIds(ids);
            let end = 0;
            if (ids && ids.length) {
                end = ids.length > PAGE_SIZE ? PAGE_SIZE : ids.length;
            }
            this.props.updateIndex(0, end);
            return this.getTopStoriesDetails(0, end, ids);
        }).then((stories) => {
            this.props.updateStories(stories);
        });
    }

    getTopStories() {
        return fetch(this.API_BASE + 'topstories.json')
            .then((response) => response.json());
    }

    getTopStoriesDetails(start, end, ids) {
        const promises = [];
        if (ids)
        for (let i = start; i < end; i++) {
            const promise = fetch(`${this.API_BASE}item/${ids[i]}.json`)
                .then(res => res.json());
            promises.push(promise);
        }
        return Promise.all(promises);
    }

    displayStory(story) {
        this.props.openStory(story);
    }

    goToPage(isPrev=false) {
        let startIndex = this.props.start;
        let endIndex = this.props.end;
        const ids = this.props.topStoriesIds;
        if (isPrev) {
            startIndex -= PAGE_SIZE;
            endIndex -= PAGE_SIZE;
            startIndex = startIndex < 0 ? 0 : startIndex;
            endIndex = endIndex > ids.length ? ids.length : endIndex;
        } else {
            startIndex += PAGE_SIZE;
            endIndex += PAGE_SIZE;
        }
        this.props.updateIndex(startIndex, endIndex);
        this.getTopStoriesDetails(startIndex, endIndex, ids)
            .then((stories) => {
                this.props.updateStories(stories);
            });
    }

    render() {
        const stories = this.props.topStories.map((entry, index) => {
            return <Entry key={index} entry={entry} clickHandler={this.displayStory}/>
        });

        return (
            <div className="container">
                <div className="sidebar">
                    <div className="navbar">
                        <h2 className="title">Hacker News Top Stories</h2>
                    </div>
                    <div className="column">
                        {stories}
                    </div>
                    <div className="navigate">
                        <button onClick={() => this.goToPage(true)} disabled={this.props.start === 0}>Previous Page</button>
                        <button onClick={() => this.goToPage()} disabled={this.props.end >= this.props.topStoriesIds.length}>Next Page</button>
                    </div>
                </div>
                <div className="main">
                    <Story entry={this.props.selectedStory} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        topStoriesIds: state.topStoriesIds,
        topStories: state.topStories,
        selectedStory: state.selectedStory,
        start: state.start,
        end: state.end
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateStories: (stories) => dispatch(updateStories(stories)),
        updateTopStoriesIds: (ids) => dispatch(updateTopStoriesIds(ids)),
        openStory: (story) => dispatch(openStory(story)),
        updateIndex: (start, end) => dispatch(updateIndex(start, end))
    };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
