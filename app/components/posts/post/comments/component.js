import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';

export default class PostCommentsComponent extends Component {
  @service store;
  @service currentUser;
  @service toast;
  @tracked commentContent = "";
  @tracked isLoadingMoreComments = false;
  sortProps = ['createdAt:desc'];

  get hasMoreComments() {
    return this.args.post.commentsCount > this.args.comments.length
  }

  get comments() {
    return this.args.comments;
  }

  @sort('comments', 'sortProps' ) sortedComments;

  @action
  async loadMoreComments() {
    this.isLoadingMoreComments = true;

    await this.store.query('comment', {
      postId: this.args.post.id,
      offset: this.args.comments.length
    })

    this.isLoadingMoreComments = false;

  }

  @action
  async deleteComment(comment) {
    comment.deleteRecord();

    try {
      await comment.save()

    } catch (e) {
      comment.rollbackAttributes();
    }
  }
}
