import constants from '../constants/actionTypes'

var initialState = {
    posts: [],
    selectedPost: null
}

export default (state = initialState, action) => {
    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.FETCH_POSTS:
            updated['posts'] = action.posts;
            updated['selectedPost'] = action.posts[0];
            return updated;
        case constants.SET_POST:
            updated['selectedPost'] = action.selectedPost;
            return updated;
        case constants.FETCH_POST:
            updated['selectedPost'] = action.selectedPost;
            return updated;
        default:
            return state;
    }
}