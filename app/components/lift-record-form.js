import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { typeOf } from '@ember/utils';

export default class LiftRecordFormComponent extends Component {
  @service router;
  @service toast;
  @service session;
  @service store;

  constructor() {
    super(...arguments);

    if (typeOf(this.args.record) !== "instance") {
      this.record = this.store.createRecord('lift-record');
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
  async createOrUpdateRecord(e) {
    e.preventDefault();

    const record = this.record;

    if (!record.validate()) {
      this.toast.info('Fix validation errors');
      return;
    }

    try {
      await record.save();

      if (record.isNew) {
        this.toast.success('Record added');
      } else {
        this.toast.success('Record updated');
      }

      this.router.transitionTo('records')

    } catch(e) {
      this.toast.error(e.message)
    }
  }

  @action
  onDateChange(dateValues) {
    this.record.date = dateValues[0];
    this.dateValues = dateValues;
  }
}
