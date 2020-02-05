import Route from '../protected';

export default class RecordsNewRoute extends Route {
  model() {
    return this.store.findAll('exercise')
  }
}
