import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function postsFetched(posts) {
    //alert("5)Posts Fetched")
    return {
        type: actionTypes.FETCH_POSTS,
        posts: posts
    }
}

function postFetched(post) {
    
    return {
        type: actionTypes.FETCH_POST,
        selectedPost: post
    }
}

function postSet(post) {
    return {
        type: actionTypes.SET_POST,
        selectedPost: post
    }
}

export function setPost(post) {
    //alert("Set post")
    return dispatch => {
        dispatch(postSet(post))
    }
}

export function fetchPosts() {
    const env = runtimeEnv();
    return dispatch => {
        //alert("4)Fetch Posts")
        
        return fetch(`${env.REACT_APP_API_URL}/posts`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
           
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } 
                return response.json();
            })
            .then( (res) => {
                dispatch(postsFetched(res));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchPost(postId){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/posts?postId=${postId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(postFetched(res));
            })
            .catch( (e) => console.log(e) );
    }
}
