import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class LiftRecordFormComponent extends Component {
  @service router;
  @service toast;
  @service session;
  @service store;
  @service fileUploader;
  @tracked record;
  @tracked videoFile;

  constructor() {
    super(...arguments);

    if (typeOf(this.args.record) !== "instance") {
      this.record = this.store.createRecord('lift-record');

      if (this.args.selectedExercise) {
        this.record.exercise = this.args.selectedExercise
      }

    } else {
      this.record = this.args.record;
    }

    this.dateValues = []
  }

  willDestroy() {
    if (this.record.isNew) {
      this.record.deleteRecord()
    }
  }

  @action
  cancel() {
    history.back();
  }

  get videoFileName() {
    return this.file ? this.file.name : null
  }

  @action
  async createOrUpdateRecord(e) {
    e.preventDefault();

    const record = this.record;

    const goalsToComplete = await this.store.query('goal', {
      isCompleted: false,
      reps: record.reps
    }).then((results) => {
      let goals = [];

      results.forEach(goal => {
        if (record.weightLifted >= goal.weight) {
          goal.isCompleted = true;

        } else {
          goal.percentageCompleted = Math.ceil(( record.weightLifted / goal.weight ) * 100);
        }

        goals.push(goal);
      })

      return goals;
    })

    if (!record.validate()) {
      this.toast.info('Fix validation errors');
      return;
    }

    try {
      if (this.videoFile) {
        const uploadedFile = await this.fileUploader.upload(this.videoFile);
        console.log(uploadedFile);

        record.videoURL = uploadedFile.body.location;
      }

      await record.save();

      for (const goal of goalsToComplete) {
        await goal.save();

        if (goal.isCompleted) {
          this.toast.success('Goal completed');
        }
      }

      if (record.isNew) {
        this.toast.success('Record added');
      } else {
        this.toast.success('Record updated');
      }

      if (typeOf(this.args.onCreateOrUpdate) === 'function') {
        this.args.onCreateOrUpdate();
        console.log('arg');
      } else {
        console.log('transition');
        this.router.transitionTo("exercises.exercise.records.record", record);
      }

    } catch(e) {
      this.toast.error(e.message)
    }
  }

  @action
  onDateChange(dateValues) {
    this.record.date = dateValues[0];
    this.dateValues = dateValues;
  }

  @action
  async setVideo(file) {
    const url = await file.readAsDataURL();
    this.videoFile = file;

    // const mediaType = file.type.split('/')[0];
    // const media = this.store.createRecord('file', { mediaType, url });
    // const user = this.currentUser.user;
    //
    // const response = await this.fileUploader.upload(file);
    //
    // user.videoURL = response.body.location;
    //
    // await user.save();
    //
    // this.videoURL = response.body.location;

  }

  @action
  removeVideo() {
    this.videoFile = null;
  }
}
