// Actions
export const openStory = (story) => ({ type: 'OPEN_STORY', payload: story });

export const updateStories = (stories) => {
    return {
        type: 'UPDATE_STORIES',
        payload: stories
    }
};

export const updateTopStoriesIds = (ids) => {
    return {
        type: 'UPDATE_STORY_IDS',
        payload: ids
    }
};

export const updateIndex = (start, end) => {
    return {
        type: 'GO_TO_PAGE',
        payload: {start, end}
    }
}
