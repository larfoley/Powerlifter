import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('lift-record', params.lift_record_id);
  }
});
