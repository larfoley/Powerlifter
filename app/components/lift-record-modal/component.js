import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class LiftRecordModalComponent extends Component {
  @service store;
  @service currentUser;

  @action
  async shareRecord() {
    const record = this.args.liftRecord;

    const post = this.store.createRecord('post' , {
      author: this.currentUser.user,
      actionText: 'shared a new lift record 💪',
      content: `${record.exercise.name} ${record.weightLifted}kgs for ${record.reps} reps`
    })

    if (record.containsVideo) {
      post.media = this.store.createRecord('file', {
        mediaType: 'video',
        url: record.videoURL,
      })
    }

    post.save();
  }

  @action
  handleClose() {
    console.log('close');
    // exercises.exercise.records
  }
}
