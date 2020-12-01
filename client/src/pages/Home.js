import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Card } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home(props) {
  const { user } = useContext(AuthContext);
  const userId = props.match.params.username;
  const {
    loading,
    data: { getPosts: posts } = {}
  } = useQuery(FETCH_POSTS_QUERY);

  return (
      <>
    <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
    </Grid.Row>
    <Grid columns={1}>
      <Grid.Column className="posts">
        {user && (
          <Grid.Column>
            <PostForm/>
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts</h1>
        ) : (
          <div className="posts-container">
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
          </div>
        )}
      </Grid.Column>
      <Card.Group>
    <Card fluid color='teal' header='BHSHHJSH' />
    </Card.Group>
    </Grid>
    
    </>
  );
}

export default Home;
