import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Header, Image, Card, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home(props) {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts } = {}
  } = useQuery(FETCH_POSTS_QUERY);


    if(posts){
    let usersList = [...new Set(posts.map(item => item.username))];
    let totalUsers = Object.keys(usersList).length;

     for(let i = totalUsers-1;i>0;i--){
        const num = Math.floor(Math.random()*(i+1));
        [usersList[i], usersList[num]] = [usersList[num], usersList[i]];
     };
    
    var user1 = usersList[0];
    var user2 = usersList[2];
    var user3 = usersList[4];
    };

     


  return (
    <>
    {loading ? (
            <Loader active/>
        ) : (
    <div className="home-container">
    <div>
      <Grid.Row className="posts-title">
        <h1>Recent Posts</h1>
    </Grid.Row>
    <Grid columns={1}>
      <Grid.Column className="posts">
        {user && (
          <Grid.Column>
            <PostForm/>
          </Grid.Column>
        )}
        
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
        
        </Grid.Column>
        </Grid>
    </div>
    <div>
    <div className="outer-home-container">
      <Grid.Row className="posts-title">
        <h1>Suggestions</h1>
    </Grid.Row>
      <Card className="home-suggestions">
      <Header as ={Link} to={`/profile/${user1}`}>
              <Image circular size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />{user1}
            </Header>
            <Header  as ={Link} to={`/profile/${user2}`}>
              <Image circular size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />{user2}
            </Header>
            <Header  as ={Link} to={`/profile/${user3}`}>
              <Image circular size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />{user3}
            </Header>
            </Card>
    </div>
    </div>
    </div>
    )}
    </>
  );
}

export default Home;
