import gql from 'graphql-tag';

const QUERY_FETCH_POSTS = gql`
{
  getPosts {
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

export default QUERY_FETCH_POSTS;