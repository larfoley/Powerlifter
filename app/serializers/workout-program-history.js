import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class WorkoutProgramHistorySerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    workoutProgram: { embedded: 'always' },
  }
}
