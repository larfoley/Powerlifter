import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PostCommentsComponent extends Component {
  @service store;
  @service currentUser;
  @service toast;
  @tracked commentContent = "";
  @tracked isLoadingMoreComments = false;

  get hasMoreComments() {
    return this.args.post.commentsCount > this.args.comments.length
  }

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
