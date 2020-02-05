import Route from '../protected';

export default class RecordsRoute extends Route {
  model() {
    return this.store.findAll('lift-record');
  }
}
