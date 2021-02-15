const { AuthenticationError, UserInputError } = require('apollo-server');

const tokenCheck = require('../../utilities/tokenCheck');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = tokenCheck(context );
      if(body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment can\'t be empty'
          }
        })
      }
      const post = await Post.findById(postId);
      console.log(post);
      if(!post) {
        throw new UserInputError('Post not found');
      } else {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = tokenCheck(context);
      const post = await Post.findById(postId);
      if(!post) {
        throw new UserInputError('Post not found');
      } else {
        const comment = post.comments.findIndex(c => c.id === commentId);
        if(!post.comments[comment].username === username) {
          throw new AuthenticationError('Access denied');
        } else {
          post.comments.splice(comment, 1);
          await post.save();
          return post;
        }
      }
    }
  }
}