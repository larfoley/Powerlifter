import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class WorkoutSessionSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    exercises: { embedded: 'always' },
  }
}
