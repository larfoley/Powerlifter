import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PostCommentsComponent extends Component {
  @service store;
  @service currentUser;
  @tracked commentContent = "";

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
      alert(e);
    }
  }
}
