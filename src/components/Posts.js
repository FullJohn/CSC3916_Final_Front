import React, { Component } from 'react';
import { fetchPosts } from '../actions/postsActions';
import { setPost } from '../actions/postsActions';
import { likePost } from '../actions/postsActions';
import {connect} from "react-redux";
import { Image } from 'react-bootstrap'
import { Carousel } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';


class PostList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchPosts());
    }

    handleSelect(selectedIndex, e) {
        const {dispatch} = this.props;
        dispatch(setPost(this.props.posts[selectedIndex]));
    }

    handleClick = (post) => {
        const {dispatch} = this.props;
        dispatch(setPost(post));
    }



    render(){
        const PostListCarousel = ({postList}) => {
            //alert("2)Posts Carousel")
            if(!postList){
                return<div>Loading...</div>;
            }
            return (
                    <div className='Feed-Wrapper'>
                        {postList.map((post) =>
                        <div className='Post-Wrapper' key ={post._id}>
                            <div className="Post-Header">
                                {post.user}
                            </div>
                            <div className="Post-Image">
                                <LinkContainer to={'/post/' + post._id} onClick={()=>this.handleClick(post)}>
                                    <Image className="Post-Image" src={post.imageUrl} thumbnail></Image>
                                </LinkContainer>
                            </div>
                        </div>
            
                        )}
                    </div>)
        }

        //alert("1)Posts Carousel Return")
        return(
            <PostListCarousel postList={this.props.posts}/>       
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts
    }
}

export default connect(mapStateToProps)(PostList);