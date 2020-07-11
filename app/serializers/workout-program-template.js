import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class WorkoutProgramTemplateSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    weeks: { embedded: 'always' },
  }
}
