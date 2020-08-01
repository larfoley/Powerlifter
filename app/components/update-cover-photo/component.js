import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UpdateCoverPhotoComponent extends Component {
  @service store;
  @service fileUploader;
  @service currentUser;
  @service router;
  @service toast;
  @tracked selectedCoverPhoto;

  get coverPhoto() {
    return this.currentUser.user.coverPhoto;
  }

  get coverPhotoStyle() {
    return this.coverPhoto ? `url(${this.coverPhoto})` : '';
  }

  @action
  async updateCoverPhoto() {
    if (this.selectedCoverPhoto) {
      const user = this.currentUser.user;
      const response = await this.fileUploader.upload(this.selectedCoverPhoto);

      user.coverPhoto = response.body.location;

      await user.save();

      this.toast.success('Cover photo updated');

      const post = this.store.createRecord('post' , {
        author: this.currentUser.user,
        actionText: 'updated their cover photo',
        actionType: 'upload-cover-photo',
        content: 'New Cover Photo'
      })

      await post.save()

      this.router.transitionTo('profile')
    }
  }

  @action
  selectCoverPhoto(file) {
    this.selectedCoverPhoto = file;
  }

  @action
  cancel() {
    this.selectedCoverPhoto = null;
    this.router.transitionTo('profile');
  }
}
