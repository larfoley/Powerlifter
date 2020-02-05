import {
  create,
  visitable,
} from 'ember-cli-page-object';
import liftRecords from '../components/lift-records';
import liftRecordForm from '../components/lift-record-form';


export default create({
  visit: visitable('/records/new'),
  liftRecordForm,
  liftRecords
});
