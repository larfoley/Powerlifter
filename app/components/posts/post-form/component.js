import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { typeOf } from '@ember/utils';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ENV from '../../../config/environment';

const { host } = ENV.APP;

export default class PostsPostFormComponent extends Component {
  @service router;
  @service toast;
  @service store;
  @service currentUser;
  @service session;

  @tracked file;
  @tracked post;
  @tracked token;

  @computed('post.media')
  get hasMedia() {
    return this.post.belongsTo('media').value() !== null;
  }

  constructor() {
    super(...arguments);


    if (typeOf(this.args.post) !== "instance") {
      this.post = this.store.createRecord('post', {
        author: this.currentUser.user
      });
    } else {
      this.post = this.args.post;
    }

    if (this.session.isAuthenticated) {
      this.token = this.session.data.authenticated.access_token;
    }

  }

  willDestroy() {
    if (this.post.isNew) {
      this.post.deleteRecord()
    }
  }

  get isValid() {
    return (!!this.post.content || !!this.file);
  }

  get isInValid() {
    return !this.isValid;
  }

  @action
  async createOrUpdatePost(e) {
    e.preventDefault();

    const post = this.post;

    if (!post.validate()) {
      this.toast.info('Your post cannot be empty.')
      return;
    }

    try {
      if (this.hasMedia && post.media.get('isNew')) {
        
        const response = await this.file.upload(host + '/upload', {
          headers: { authorization: 'Bearer ' + this.token }
        });

        this.toast.success('file ' + response.body.location + ' uploaded');
        post.media.set('url', response.body.location);
      }

      await post.save();

      this.toast.success('Post saved');
      this.router.transitionTo('my-network');

    } catch(e) {
      this.toast.error(e.message)
    }
  }

  @action
  async setMedia(file) {
    const url = await file.readAsDataURL();
    const mediaType = file.type.split('/')[0];
    const media = this.store.createRecord('file', { mediaType, url });

    this.file = file;
    this.post.media = media;
  }

  @action
  removeMedia() {
    this.post.media = null
  }
}
