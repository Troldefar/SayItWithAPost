import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SinglePost = ({post}) => {
  const likePost = () => {
      
  }
  const commentOnPost = () => {
      
  }
  return ( 
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
        />
        <Card.Header>
          { post.username }
        </Card.Header>
        <Card.Meta
          as={Link}
          to={`/posts/${post.id}`}
        >
          { post.createdAt }
        </Card.Meta>
        <Card.Description>
          { post.body }
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='red' basic>
            <Icon name='heart' />
          </Button>
          <Label basic color='red' pointing='left'>
            { post.likeCount }
          </Label>
        </Button>
        <Button as='div' labelPosition='right' onClick={commentOnPost}>
          <Button color='green' basic>
            <Icon name='comments' />
          </Button>
          <Label basic color='green' pointing='left'>
            { post.commentCount }
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default SinglePost;