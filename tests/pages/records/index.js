import {
  create,
  visitable,
  clickable
} from 'ember-cli-page-object';
import liftRecords from '../components/lift-records';

export default create({
  visit: visitable('/records'),
  newRecordLink: clickable('[data-test-new-record-link]'),
  liftRecords
});
