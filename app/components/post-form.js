import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { typeOf } from '@ember/utils';
import { action } from '@ember/object';

export default class PostFormComponent extends Component {
  @service router;
  @service toast;
  @service store;
  @service currentUser;

  constructor() {
    super(...arguments);

    if (typeOf(this.args.post) !== "instance") {
      const author = this.store.peekRecord('user', this.currentUser.user.id);
      
      this.post = this.store.createRecord('post', {
        author: author
      });
    } else {
      this.post = this.args.post;
    }
  }

  willDestroy() {
    if (this.post.isNew) {
      this.post.deleteRecord()
    }
  }

  @action
  async createOrUpdatePost(e) {
    e.preventDefault();

    const post = this.post;

    try {
      await post.save();

      if (post.isNew) {
        this.toast.success('Post added');
      } else {
        this.toast.success('Post updated');
      }

      this.router.transitionTo('my-network');

    } catch(e) {
      this.toast.error(e.message)
    }
  }
}
