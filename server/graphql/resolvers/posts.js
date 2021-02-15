const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const tokenCheck = require('../../utilities/tokenCheck');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if(!post) {
          throw new Error('Post not found');
        } else {
          return post;
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  },
  Mutation: {
    async createPost(_, { body, }, context) {
      const user = tokenCheck(context);
      if(body.trim() === '') {
        throw new UserInputError('Your body needs text!');
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const post = await newPost.save();
      // Emit event with the newly created post
      context.pubsub.publish('NEW_POST_ADDED', {
        newPost: post
      });
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = tokenCheck(context);
      const post = await Post.findById(postId);
      if(!user.name === post.username) {
        throw new AuthenticationError('Access denied');
      } else {
        try {
          await post.delete();
          return 'Post deleted';
        } catch (e) {
          throw new AuthenticationError('Access denied');
        }
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = tokenCheck(context);
      const post = await Post.findById(postId);
      if(!post) {
        return new UserInputError('Post not found');
      } else {
        if(post.likes.find(like => like.username === username)) {
          // Unlike since it's already present
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          // Like the comment
          post.likes.push({ username, createdAt: new Date().toISOString() });
        }
        await post.save();
        return post;
      }
    }
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST_ADDED') 
    }
  }
}