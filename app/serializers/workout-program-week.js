import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class WorkoutProgramWeekSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    workouts: { embedded: 'always' },
  }
}
