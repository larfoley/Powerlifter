import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeQueryRecordResponse(store, primaryModelClass, payload) {
    if (payload.liftRecords) {
      payload.liftRecord = payload.liftRecords[0];
      delete payload.liftRecords;
    }

    return this._super(...arguments);
  }
});
