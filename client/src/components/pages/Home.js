import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import SinglePost from '../Post/SinglePost';

import QUERY_FETCH_POSTS from '../gql/fetchPostsGQL.js';

const Home = () => {
  const { 
    loading, 
    data: { 
      getPosts: posts 
    }
  } = useQuery(QUERY_FETCH_POSTS);
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>
          Recent posts
        </h1>
      </Grid.Row>
      <Grid.Row>
        { loading ? (
          <h1>
            Loading posts..
          </h1>
        ) : (
          posts && posts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <SinglePost post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}
 
export default Home;