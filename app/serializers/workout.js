import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class WorkoutSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    exercises: { embedded: 'always' },
  }
}
