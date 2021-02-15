import gql from 'graphql-tag';

const QUERY_LOGIN_USER = gql`
  mutation login (
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default QUERY_LOGIN_USER;