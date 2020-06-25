import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { typeOf } from '@ember/utils';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProfilePicComponent extends Component {
  @service store;
  @service fileUploader;
  @service currentUser;
  @service toast;

  @tracked profilePic = this.currentUser.user.profilePic;

  @action
  async setProfilePic(file) {
    const url = await file.readAsDataURL();
    const mediaType = file.type.split('/')[0];
    const media = this.store.createRecord('file', { mediaType, url });
    const user = this.currentUser.user;

    const response = await this.fileUploader.upload(file);

    user.profilePic = response.body.location;

    await user.save();

    profilePic = response.body.location;


    this.toast.success('Profile picture updated');
  }
}
