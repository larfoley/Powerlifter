import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PostComponent extends Component {
  @service currentUser;
  @service store;
  @service flashMessages;

  @tracked showingComments = false;

  get isCurrentUsersPost() {
    return this.args.post.author.username === this.currentUser.user.username;
  }

  get hasMoreLikes() {
    const post = this.args.post;

    return post.likesCount > post.likes.length;
  }

  @action
  toggleComments() {
    this.showingComments = !this.showingComments;
  }

  @action
  async likePost(post) {

    const like = this.store.createRecord('like', {
      post,
      user: this.currentUser.user
    })

    try {
      await like.save();

      post.likesCount += 1;
      post.like = like;

      await post.save();

    } catch (e) {
      console.log(e);
    }
  }

  @action
  async unlikePost(post) {
    const like = await post.like;

    try {
      like.deleteRecord();
      post.likesCount -= 1;

      await like.save();

    } catch (e) {
      console.log(e);
    }
  }

  @action
  async postComment(e) {
    e.preventDefault();
    const post = this.args.post;

    const comment = this.store.createRecord('comment', {
      post,
      author: this.currentUser.user,
      content: this.commentContent
    });

    try {
      await comment.save()
      this.commentContent = "";

    } catch (e) {
      comment.rollbackAttributes();
      this.toast.error(e.message)
    }
  }

  @action
  async deletePost(post) {
    try {
      post.deleteRecord();

      await post.save();

    } catch (e) {
      console.log(e);
    }
  }
}
