import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label,
  Transition,
  Header
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

function SingleProfile(props) {
  const postId = props.match.params.postId;
  const userId = props.match.params.username;
  const createdAt = props.match.params.createdAt;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  

  const [comment, setComment] = useState('');

  const {
    loading,
    data: { getPosts: posts } = {}
  } = useQuery(FETCH_POSTS_QUERY);


  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  if(posts){
  var pageOwnerPosts = posts.filter(function (f) {
    return f.username === userId;
  });
};


  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup = (
    <>
    {loading ? (
          <h1>Loading posts</h1>
        ) : (
      <Grid columns={1}>
      <Grid.Column className="posts">

          <div className="user-container">
  <Header as='h1' className="profile-header">
              <Image circular src="https://react.semantic-ui.com/images/avatar/large/molly.png" /> {userId}
            </Header>
            
          <Transition.Group>
            {pageOwnerPosts && 
              pageOwnerPosts.map((post) => (
                <Grid>
                <Grid.Column key={post.id} className="posts-grid" >
                  <PostCard post={post} />
                </Grid.Column>
                </Grid>
              ))}
          </Transition.Group>
          </div>
      </Grid.Column>
      </Grid>
      )}
      </>
    );
    return (
      postMarkup
    )
    
    
  };
  


const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SingleProfile;
