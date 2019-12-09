import ProtectedRoute from '../protected';
// import deleteEmptyRecord from '../../utils/deleteEmptyRecord';

export default ProtectedRoute.extend({
  modeel() {
    return this.store.createRecord('post');
  },

  // actions: {
  //   willTransition() {
  //     deleteEmptyRecord(this.store, 'post');
  //   }
  // }
});
