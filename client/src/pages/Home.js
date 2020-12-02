import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Header, Image, Card } from 'semantic-ui-react';

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


  const users = [...new Set(posts.map(item => item.username)) ]
  const total_users = Object.keys(users).length;

  for(let i = total_users-1;i>0;i--){
    const num = Math.floor(Math.random()*(i+1));
    [users[i], users[num]] = [users[num], users[i]];
  }
  const user1 = users[0];
  const user2 = users[2];
  const user3 = users[4];
  

  return (
    <>
    <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
    </Grid.Row>
    <div className="home-container">
    <div>
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
        </Grid>
    </div>
    <div>
    <div className="outer-home-container">
      <Card className="home-suggestions">
      <Header as='h4' >
              <Image circular size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />{user1}
            </Header>
            <Header as='h4'>
              <Image circular size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />{user2}
            </Header>
            <Header as='h4'>
              <Image circular size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" /> {user3}
            </Header>
            </Card>
    </div>
    </div>
    </div>
    </>
  );
}

export default Home;
