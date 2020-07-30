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
  @tracked isNew = false;

  constructor() {
    super(...arguments);

    if (typeOf(this.args.record) !== "instance") {
      this.isNew = true;
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

        record.videoURL = uploadedFile.body.location;
      }

      await record.save();

      for (const goal of goalsToComplete) {
        await goal.save();

        if (goal.isCompleted) {
          this.toast.success('Goal completed');
        }
      }

      if (this.isNew) {
        this.toast.success('Record added');
      } else {
        this.toast.success('Record updated');
      }

      await this.args.records.update();

      if (typeOf(this.args.onCreateOrUpdate) === 'function') {
        this.args.onCreateOrUpdate();
      } else {
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
  setVideo(file) {
    this.videoFile = file;
  }

  @action
  removeVideo() {
    this.videoFile = null;
  }
}
