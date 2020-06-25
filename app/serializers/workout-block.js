import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class WorkoutBlockSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    sets: { embedded: 'always' },
  }
}
