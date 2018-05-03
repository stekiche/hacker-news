
const initialState = {
    topStories: [],
    topStoriesIds: [],
    selectedStory: undefined
};

export default function rootReducer(state=initialState, {type, payload}) {
    switch (type) {
        case 'OPEN_STORY':
            return {...state, selectedStory: payload};
        case 'UPDATE_STORIES':
            return {...state, topStories: payload};
        case 'UPDATE_STORY_IDS':
            return {...state, topStoriesIds: payload};
        case 'GO_TO_PAGE':
            return {...state, start: payload.start, end: payload.end};
        default:
            return state;
    }
}
