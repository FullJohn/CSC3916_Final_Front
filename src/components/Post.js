import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import { fetchPost } from "../actions/postsActions";
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { Navigate } from 'react-dom'


export class Post extends Component {

    constructor(props){
        super(props);
        this.state = {quote: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit(event){
        const quote = this.state.quote;
        alert("Handle submit")
        var env = runtimeEnv();
        fetch(`${env.REACT_APP_API_URL}/comments`, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': localStorage['token'],
            },
            body:JSON.stringify({
                postId: this.props.postId,
                quote: quote,
            })
        })

        .then(response=>response.json())

        .then((result)=>{
            if(!result['success']){
                alert(result['msg'])
            }
        })
    };
    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedpost == null) {
            dispatch(fetchPost(this.props.postId));
        }

    }
    render() {
        const CommentsInfo = ({comments}) => {
            return comments.map((comment, i) =>
            <p key={i}>
                <div className='Comment-Format'>
                    <div className='Comment-User'>
                        <b></b>{comment.user}
                    </div>
                    <div className='Comment-Quote'>
                        {comment.quote}  
                    </div>
                
                </div>
    
            </p>)
        }
        
        
        const PostCarousel = ({currentpost}) => {
            if (!currentpost) { //if not could still be fetching the post
                return <div>Loading...</div>;
            }

            return (
                <div className='Feed-Wrapper'>
                    <div className='Post-Wrapper'>
                        <div className="Post-Header">
                            {currentpost.user}
                        </div>

                        <div className="Post-Image">
                            <Image className="Post-Image" src={currentpost.imageUrl} thumbnail></Image>
                        </div>
                    </div>
                    <div className = 'Comments-Wrapper'>
                        Comments

                    </div>
                    <CommentsInfo comments={currentpost.comments}></CommentsInfo>
                    
                    </div>
            );
        }
        return (
            <div className ='Feed-Wrapper'>

                <PostCarousel currentpost={this.props.selectedPost} />
                
                <div className='Comments-Wrapper'>
                    
                        <div>
                            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                                <div className='Comment-Box'>
                                <input type = "text" name ="quote"/>

                                </div>
                                
                                <input className = 'Submit-Button' type = "submit" value = "Add Comment"/>
                            </form>
                        </div>     
                    </div>
            </div>    
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    
    return {
        selectedPost: state.post.selectedPost,
        postId: ownProps.match.params.postId,
    }
}

export default withRouter(connect(mapStateToProps)(Post));