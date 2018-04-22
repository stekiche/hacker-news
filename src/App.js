import React, { Component } from 'react';
import Entry from './components/entry/Entry';
import Story from './components/story/Story';
import './App.css';

class App extends Component {
    
    API_BASE = 'https://hacker-news.firebaseio.com/v0/';
    topStories = [];
    entries = [];

    constructor() {
        super();
        this.state = {
            topStories: [],
            entries: [],
            selectedStory: null
        }
    }

    getTopStories() {
        return fetch(this.API_BASE + 'topstories.json')
            .then((response) => response.json());
    }

    getTopStoriesDetails(start, end) {
        const promises = [];
        for (let i = start; i < end; i++) {
            const promise = fetch(`${this.API_BASE}item/${this.state.topStories[i]}.json`)
                .then(res => res.json());
            promises.push(promise);
        }
        return Promise.all(promises);
    }

    componentWillMount() {
        this.getTopStories().then(stories => {
            this.setState({topStories: stories});
            return this.getTopStoriesDetails(0, 25);
        }).then((entries) => {
            this.setState({entries: entries});
        });
    }

    displayStory(story) {
        this.setState({selectedStory: story});
    }

    render() {

        return (
            <div className="app-wrapper">
                <div className="app-sidebar">
                    <div className="app-header">
                        <h2 className="title">Hacker News Top Stories</h2>
                    </div>
                    <div className="app-list">
                        {this.state.entries.map((entry, i) => {
                            return <Entry key={i} entry={entry} clickHandler={this.displayStory.bind(this)}/>
                        })}
                    </div>
                </div>
                <div className="app-content">
                    <div className="app-content--view">
                        <Story entry={this.state.selectedStory} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
