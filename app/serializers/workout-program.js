import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class WorkoutProgramSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    // workouts: { embedded: 'always' },
    weeks: { embedded: 'always' },
  }
}
