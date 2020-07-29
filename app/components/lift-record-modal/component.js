import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiftRecordModalComponent extends Component {
  @service store;
  @service currentUser;
  @service toast;
  @service router;
  @tracked showConfirmShareModal = false;
  @tracked showConfirmDeleteModal = false;

  @action
  async shareRecord(liftRecord) {
    try {
      const post = this.store.createRecord('post' , {
        author: this.currentUser.user,
        actionText: 'shared a new lift record 💪',
        content: `${liftRecord.exercise.name} ${liftRecord.weightLifted}kgs for ${liftRecord.reps} reps`
      })

      if (liftRecord.containsVideo) {
        post.media = this.store.createRecord('file', {
          mediaType: 'video',
          url: liftRecord.videoURL,
        })
      }

      await post.save();

      await liftRecord.save();

      this.toast.success('Lift Record Shared');
      this.router.transitionTo('exercises.exercise.records')

    } catch (e) {
      liftRecord.rollbackAttributes();
      console.error(e);

    } finally {

      this.toggleConfirmShareModal()
    }
  }

  @action
  async deleteRecord(liftRecord) {
    try {
      liftRecord.deleteRecord();

      await liftRecord.save();

      this.toast.success('Lift Record Deleted');

    } catch (e) {
      liftRecord.rollbackAttributes();

    } finally {

      this.toggleConfirmShareModal()
    }
  }

  @action
  toggleConfirmShareModal() {
    this.showConfirmShareModal = !this.showConfirmShareModal
  }

  @action
  toggleConfirmDeleteModal() {
    this.showConfirmDeleteModal = !this.showConfirmDeleteModal
  }

  @action
  handleClose() {
    this.router.transitionTo('exercises.exercise.records')
  }
}
