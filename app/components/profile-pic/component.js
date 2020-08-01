import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ProfilePicComponent extends Component {
  @service store;
  @service fileUploader;
  @service currentUser;
  @service toast;

  get profilePic() {
    return this.currentUser.user ? this.currentUser.user.profilePic : ''
  }

  @action
  async setProfilePic(file) {
    const user = this.currentUser.user;
    const response = await this.fileUploader.upload(file);

    user.profilePic = response.body.location;

    await user.save();

    this.toast.success('Profile picture updated');

    const post = this.store.createRecord('post' , {
      author: this.currentUser.user,
      actionText: 'updated their profile pic',
      actionType: 'upload-profile-pic',
      content: 'New profile pic'
    })

    await post.save()
  }
}
