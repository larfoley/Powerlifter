import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQueryRecord(query) {
    return `${this._super(...arguments)}/active`;
  }
});
