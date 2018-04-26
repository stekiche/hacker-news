import React, { Component } from 'react';
import Entry from './components/Entry';
import Story from './components/Story';

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
        this.displayStory = this.displayStory.bind(this);
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

        const stories = this.state.entries.map((entry, index) => {
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
                </div>
                <div className="main">
                    <Story entry={this.state.selectedStory} />
                </div>
            </div>
        );
    }
}

export default App;
